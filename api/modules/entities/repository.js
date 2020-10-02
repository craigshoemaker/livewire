const { get, add, update } = require("./dataService");
const patterns = require("../utils/patterns");
const httpResponses = require("../utils/httpResponses");
const { getConfig } = require("../metadata");
const metadata = require("../../modules/metadata");
const axios = require("axios").default;

const _module = {
  type: "repository",

  create: (url, branch, version) => {
    return {
      PartitionKey: "repository",
      RowKey: _module.getRowKey(url),
      url,
      branch,
      version,
    };
  },

  exists: async (partitionKey, rowKey) => {
    const entity = await get(partitionKey, rowKey);
    const exists = !!entity.Timestamp;
    return exists;
  },

  getRowKey: (url) => url.replace(patterns.GITHUB, "").replace("/", "-"),

  getUsernameAndRepoName: (url) => {
    const pattern = /https?:\/\/github\.com\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)/;
    const [match, username, repoName] = url.match(pattern);
    return { username, repoName };
  },

  tryAdd: async (url, branch) => {
    return new Promise(async (resolve, reject) => {
      const { create, exists, validate } = _module;

      try {
        const validationErrorResponse = validate(url, branch);
        const isValid = !!!validationErrorResponse;

        if (isValid) {
          let validResponse;
          const resource = create(url, branch);
          const { PartitionKey: pk, RowKey: rk } = resource;

          const doesNotExist = !(await exists(pk, rk));
          if (doesNotExist) {
            const metadata = await getConfig(url, branch);

            if (metadata) {
              resource.title = metadata.title;
              resource.description = metadata.description;
              resource.categories = JSON.stringify(metadata.categories);
              resource.languages = JSON.stringify(metadata.languages);
              resource.technologies = JSON.stringify(metadata.technologies);
            }

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

  getChanges: async (resource) => {
    const { url, branch, version } = resource;
    const livewireMetadata = await metadata.getConfig(url, branch);
    const { username, repoName } = _module.getUsernameAndRepoName(url);

    const isChanged =
      livewireMetadata.version &&
      livewireMetadata.version.toString() !== version;

    const hasRequiredData = !!(username && repoName);

    let value = {};

    if (isChanged && hasRequiredData) {
      const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
      const { data: githubConfig } = await axios.get(apiUrl);

      value = { ...resource, ...livewireMetadata };
      value.forks = githubConfig.forks_count;
      value.issues = githubConfig.open_issues_count;
      value.stars = githubConfig.stargazers_count;
      value.watchers = githubConfig.watchers_count;
      value.updated = githubConfig.updated_at;
      value.hasChanges = true;

      delete value[".metadata"];
    }

    return value;
  },

  update: async (entity) => {
    const response = await update(entity);
    return response;
  },

  validate: (url, branch) => {
    let returnValue = null;

    const messages = [];

    if (!patterns.GITHUB.test(url)) {
      messages.push("A GitHub repository URL is required.");
    }

    if (!branch || branch.length === 0) {
      messages.push("A branch name is required.");
    }

    if (messages.length > 0) {
      returnValue = httpResponses.custom(400, messages.join());
    }

    return returnValue;
  },
};

module.exports = _module;
