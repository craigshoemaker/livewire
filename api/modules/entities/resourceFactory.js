const repositoryResource = require("./repositoryResource");
const extensionResource = require("./extensionResource");
const patterns = require("../patterns");

module.exports = {
  create: (url) => {
    if (patterns.GITHUB.test(url)) {
      return repositoryResource;
    } else if (patterns.VSCODE_MARKETPLACE.test(url)) {
      return extensionResource;
    } else {
      throw `Unknown resource type based on the url: ${url}`;
    }
  },
};
