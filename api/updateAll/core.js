const dataService = require("../modules/entities/resourcesData");
const metadata = require("../modules/metadata");
const axios = require("axios").default;
const { send } = require("../modules/messenger");

const _module = {
  updateAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await dataService.getCollection(
          null, // select all values
          "PartitionKey = repository" // only "repository" records
        );

        const { data: resources } = response;
        resources.forEach(async (resource) => {
          const { url, branch, version } = resource;
          const config = await metadata.getConfig(url, branch);

          const usernameAndRepoNameExpression = /https:\/\/github\.com\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)/;
          const [match, username, repoName] = url.match(
            usernameAndRepoNameExpression
          );

          const isChanged =
            config.version && config.version.toString() !== version;
          const hasRequiredData = username && repoName;

          if (isChanged && hasRequiredData) {
            const { data: githubConfig } = await axios.get(
              `https://api.github.com/repos/${username}/${repoName}`
            );

            const message = { ...resource, ...config };
            message.forks = githubConfig.forks_count;
            message.issues = githubConfig.open_issues_count;
            message.stars = githubConfig.stargazers_count;
            message.watchers = githubConfig.watchers_count;
            message.updated = githubConfig.updated_at;

            await send(message);
          } else {
            // No changes to any data.... do nothing
          }
        });
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = _module;
