const axios = require("axios").default;
const { get, add } = require("./dataService");
const patterns = require("../utils/patterns");
const httpResponses = require("../utils/httpResponses");
const repository = require("./repository");

const _module = {
  type: "extension",

  create: (url) => {
    return {
      PartitionKey: "extension",
      RowKey: _module.getRowKey(url),
      url: url,
    };
  },

  exists: async (partitionKey, rowKey) => {
    const entity = await get(partitionKey, rowKey);
    const exists = !!entity.Timestamp;
    return exists;
  },

  getRowKey: (url) => url.replace(patterns.VSCODE_MARKETPLACE, ""),

  getChanges: async (resource) => {
    const { RowKey: id } = resource;
    const url = `https://marketplace.visualstudio.com/items?itemName=${id}`;
    const { data } = await axios.get(url);

    const githubUrlMatches = data.match(/https:\/\/github\.com\/(.*?)\.git/);
    const [githubUrl] = githubUrlMatches;

    const descriptionMatches = data.match(
      /<div class=\"ux-item-shortdesc\">(.*?)<\/div>/
    );
    const [dMatch, description] = descriptionMatches;

    const titleMatches = data.match(
      /<span class=\"ux-item-name\">(.*?)<\/span>/
    );
    const [tMatch, title] = titleMatches;

    resource.branch = "master";
    resource.url = githubUrl;

    const metadata = {
      title,
      description,
      version: true,
    };

    const value = await repository.getChanges(resource, metadata);
    value.hasChanges = true;

    return value;
  },

  tryAdd: async (url) => {
    return new Promise(async (resolve, reject) => {
      const { create, exists, validate } = _module;

      try {
        const validationErrorResponse = validate(url);
        const isValid = !!!validationErrorResponse;

        if (isValid) {
          let validResponse;
          const resource = create(url);
          const { PartitionKey: pk, RowKey: rk } = resource;

          const doesNotExist = !(await exists(pk, rk));
          if (doesNotExist) {
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
        reject(exception);
      }
    });
  },

  validate: (url) => {
    let returnValue = null;

    const messages = [];

    if (!patterns.VSCODE_MARKETPLACE.test(url)) {
      messages.push("A VS Code marketplace URL is required.");
    }

    if (messages.length > 0) {
      returnValue = httpResponses.custom(400, messages.join());
    }

    return returnValue;
  },
};

module.exports = _module;
