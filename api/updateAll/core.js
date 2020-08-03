const dataService = require("../modules/resourcesData");
const metadata = require("../modules/metadata");
const axios = require("axios").default;
const { send } = require("../modules/messenger");

const _module = {
  updateAll: async () => {
    const response = await dataService.getCollection(
      null, // select all values
      "PartitionKey = repository" // where
    );
    const { data: resources } = response;
    resources.forEach(async (resource) => {
      const { url, branch, version } = resource;
      const config = await metadata.getConfig(url, branch);
      const isChanged = config.version && config.version.toString() !== version;

      if (isChanged) {
        const usernameAndRepoNameExpression = /https:\/\/github\.com\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)/;
        const [match, username, repoName] = url.match(
          usernameAndRepoNameExpression
        );
        const { data: githubConfig } = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );

        const message = { ...resource, ...config };
        message.forks = githubConfig.forks_count;
        message.issues = githubConfig.open_issues_count;
        message.stars = githubConfig.stargazers_count;
        message.watchers = githubConfig.watchers_count;
        message.updated = githubConfig.updated_at;

        const sendResponse = await send(message);
        console.log();
      } else {
        console.log("no changes");
      }
    });
  },
};

module.exports = _module;
