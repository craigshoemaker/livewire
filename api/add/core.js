const { get, add } = require("../modules/resourcesData");

const _module = {
  GITHUB_PATTERN: /https?\:\/\/github\.com\//,
  VSCODE_MARKETPLACE_PATTERN: /https:\/\/marketplace\.visualstudio\.com\/items\?itemName\=/,

  getGitHubKeyByUrl: (gitHubUrl) => {
    let key = gitHubUrl.replace(_module.GITHUB_PATTERN, "");
    key = key.replace("/", "-");
    return key;
  },

  getExtensionKeyByUrl: (vsCodeExtensionUrl) => {
    let key = vsCodeExtensionUrl.replace(
      _module.VSCODE_MARKETPLACE_PATTERN,
      ""
    );
    return key;
  },

  getKeyByUrl: (url) => {
    return _module.isGitHubUrl(url)
      ? _module.getGitHubKeyByUrl(url)
      : _module.getExtensionKeyByUrl(url);
  },

  createResource: (url) => {
    const isGitHub = _module.isGitHubUrl(url);
    const partitionKey = isGitHub ? "repository" : "extension";
    const rowKey = _module.getKeyByUrl(url);
    return {
      PartitionKey: partitionKey,
      RowKey: rowKey,
      url: url,
    };
  },

  isGitHubUrl: (url) => url.match(_module.GITHUB_PATTERN),

  isExtensionUrl: (url) => url.match(_module.VSCODE_MARKETPLACE_PATTERN),

  addUrlIfDoesNotExist: async (url) => {
    return new Promise(async (resolve, reject) => {
      const responses = {
        added: {
          status: 200,
          body: "Added",
        },
        error: {
          status: 500,
          body: "An error occurred while trying to to add the resource.",
        },
        exists: {
          status: 400,
          body: "URL already exists.",
        },
        invalidUrl: {
          status: 400,
          body:
            "A GitHub repository or Visual Studio Code extension marketplace URL is required.",
        },
      };

      let response = {};

      try {
        const { createResource, isExtensionUrl, isGitHubUrl } = _module;

        if (isGitHubUrl(url) || isExtensionUrl(url)) {
          const resource = createResource(url);
          const getResponse = await get(resource.PartitionKey, resource.RowKey);
          const exists = !!getResponse.Timestamp;

          if (!exists) {
            const addResponse = await add(resource);
            if (addResponse[".metadata"].etag) {
              response = responses.added;
            } else {
              response = responses.error;
            }
          } else {
            response = responses.exists;
          }
        } else {
          response = responses.invalidUrl;
        }

        resolve(response);
      } catch (exception) {
        reject(exception);
      }
    });
  },
};

module.exports = _module;
