const { get, add, update } = require("./dataService");
const patterns = require("../utils/patterns");
const resourceMetadataService = require("./resourceMetadataService");
const httpResponses = require("../utils/httpResponses");
const livewireMetadataService = require("./livewireMetadataService");

const _module = {
  getChanges: async (resource) => {
    try {
      resource = await resourceMetadataService.getMetadata(resource);

      if (/repository/.test(resource.PartitionKey)) {
        resource = await livewireMetadataService.getValues(resource);
      }

      return resource;
    } catch (error) {
      throw error;
    }
  },

  getStarterObject: (url) => {
    return {
      PartitionKey: getPartitionKey(url),
      RowKey: getRowKey(url),
      url: getUrl(url),
      path: getPath(url)
    };
  },

  add: async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        const validationErrorResponse = validate(url);
        const isValid = !!!validationErrorResponse;

        const { getStarterObject } = _module;

        if (isValid) {
          let validResponse;
          let resource = getStarterObject(url);
          const { PartitionKey: pk, RowKey: rk } = resource;
          const doesNotExist = !(await exists(pk, rk));

          const isRepo = patterns.GITHUB.test(url);

          if (doesNotExist) {
            resource = await resourceMetadataService.getMetadata(resource);

            if (isRepo) {
              const metaValues = await livewireMetadataService.getValues(
                resource
              );

              if (metaValues) {
                resource.title = metaValues.title;
                resource.description = metaValues.description;
                resource.categories = JSON.stringify(metaValues.categories);
                resource.languages = JSON.stringify(metaValues.languages);
                resource.technologies = JSON.stringify(metaValues.technologies);
              }
            }

            delete resource.hasChanges;

            const addResult = await add(resource);

            if (addResult[".metadata"] && addResult[".metadata"].etag) {
              validResponse = httpResponses.added;
            } else {
              validResponse = httpResponses.error;
            }
          } else {
            validResponse = httpResponses.exists;
          }

          resolve(validResponse);
        } else {
          resolve(validationErrorResponse);
        }
      } catch (exception) {
        if (exception.status === 200) {
          resolve(exception);
        } else {
          reject(exception);
        }
      }
    });
  },

  exists: async (partitionKey, rowKey) => {
    const entity = await get(partitionKey, rowKey);
    const exists = !!entity.Timestamp;
    return exists;
  },

  update: async (entity) => {
    const response = await update(entity);
    return response;
  },

  validate: (url) => {
    let returnValue = null;

    const messages = [];

    if (!patterns.GITHUB.test(url) && !patterns.VSCODE_MARKETPLACE.test(url)) {
      messages.push(
        "A GitHub repository or VS Code marketplace URL is required."
      );
    }

    if (messages.length > 0) {
      returnValue = httpResponses.custom(400, messages.join());
    }

    return returnValue;
  },

  /* ---------------------------- */

  getPartitionKey: (url) => {
    let key = "";

    if (patterns.GITHUB.test(url)) {
      key = "repository";
    } else if (patterns.VSCODE_MARKETPLACE.test(url)) {
      key = "extension";
    } else {
      throw new Error(`[resource.getPartitionKey] Unknown URL pattern: ${url}`);
    }

    return key;
  },

  getUrl: (url) => {

    if(/\.json$/.test(url)) {
      // Monorepo URL example:
      //   https://github.com/craigshoemaker/livewire-monorepo/blob/main/src/app1/livewire.config.json
      const matches = url.match(/(https?:\/\/github.com\/.*?\/.*?)\//);
      const [match, urlTrimmed] = matches;
      url = urlTrimmed;
    }

    return url;
  },

  getPath: (url) => {
    const matches = url.match(/https?:\/\/github.com\/.*?\/.*?\/blob\/.*?\/(.*)\/livewire\.config\.json/);
    const [match, path] = matches;
    return path;
  },

  getRowKey: (url) => {
    let key = '';
    let match = '', path = ''; // placeholder variables for regex match


    if (patterns.GITHUB.test(url)) {

      key = url.replace(patterns.GITHUB, "");
      
      if(/\.json$/.test(url)) {       
        let matches = key.match(/(.*?)\/(.*?)\/blob\/.*?\/(.*)\/livewire\.config\.json/);
        [match, username, reponame, path] = matches;
        key = `${username}:${reponame}:${path}`;
      } else {
        let matches = key.match(/(.*)\/(.*)\/?/);
        [match, username, reponame] = matches;
        key = `${username}:${reponame}`;
      }
      
      key = key.replace(/\//g, '-');

    } else if (patterns.VSCODE_MARKETPLACE.test(url)) {
      key = url.replace(patterns.VSCODE_MARKETPLACE, "");
    } else {
      throw new Error(`[resource.getRowKey] Unknown URL pattern: ${url}`);
    }

    return key;
  },
};

const { exists, getPartitionKey, getRowKey, getUrl, getPath, validate } = _module;

module.exports = _module;
