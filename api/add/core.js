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

  createResource: (url, branch) => {
    const isGitHub = _module.isGitHubUrl(url);

    if (isGitHub && !branch) {
      throw "A branch name is required when adding a GitHub repository.";
    }

    const partitionKey = isGitHub ? "repository" : "extension";
    const rowKey = _module.getKeyByUrl(url);

    const value = {
      PartitionKey: partitionKey,
      RowKey: rowKey,
      url: url,
    };

    if (branch) {
      value.branch = branch;
    }

    return value;
  },

  isGitHubUrl: (url) => _module.GITHUB_PATTERN.test(url),

  isExtensionUrl: (url) => _module.VSCODE_MARKETPLACE_PATTERN.test(url),

  hasBranch: (name) => name.length > 0,

  addUrlIfDoesNotExist: async (url, branch) => {
    return new Promise(async (resolve, reject) => {
      const {
        createResource,
        isExtensionUrl,
        isGitHubUrl,
        hasBranch,
      } = _module;

      const responses = {
        added: {
          status: 200,
          body: "Added",
        },
        branchRequired: {
          status: 400,
          body: "A branch name is required when adding a GitHub repository.",
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
            "A GitHub repository or Visual Studio Code extension marketplace URL and branch name is required.",
        },
      };

      let response = null;

      try {
        if (!(isGitHubUrl(url) || isExtensionUrl(url))) {
          response = responses.invalidUrl;
        }

        if (isGitHubUrl(url) && !hasBranch(branch)) {
          response = responses.branchRequired;
        }

        if (!response) {
          const resource = createResource(url, branch);
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
        }

        resolve(response);
      } catch (exception) {
        reject(exception);
      }
    });
  },
};

module.exports = _module;
