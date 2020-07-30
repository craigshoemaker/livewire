const { get, add } = require("../modules/resourcesData");
const patterns = require("./patterns");
const httpResponses = require("./httpResponses");
const { getConfig } = require("./metadata");

const _module = {
  type: "repository",

  create: (url, branch) => {
    return {
      PartitionKey: "repository",
      RowKey: _module.getRowKey(url),
      url: url,
      branch: branch,
    };
  },

  exists: async (partitionKey, rowKey) => {
    const response = await get(partitionKey, rowKey);
    const exists = !!response.Timestamp;
    return exists;
  },

  getRowKey: (url) => url.replace(patterns.GITHUB, "").replace("/", "-"),

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
