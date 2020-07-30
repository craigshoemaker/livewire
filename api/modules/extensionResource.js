const { get, add } = require("../modules/resourcesData");
const patterns = require("./patterns");
const httpResponses = require("./httpResponses");
const { extractFromReadme: getMetadataFromReadme } = require("./metadata");

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
    const response = await get(partitionKey, rowKey);
    const exists = !!response.data.Timestamp;
    return exists;
  },

  getRowKey: (url) => url.replace(patterns.VSCODE_MARKETPLACE, ""),

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
