const repository = require("./repository");
const extension = require("./extension");
const patterns = require("../patterns");

module.exports = {
  create: (url) => {
    if (patterns.GITHUB.test(url)) {
      return repository;
    } else if (patterns.VSCODE_MARKETPLACE.test(url)) {
      return extension;
    } else {
      throw `Unknown resource type based on the url: ${url}`;
    }
  },
};
