const axios = require("axios").default;
const patterns = require("../utils/patterns");
const config = require("../utils/config");
const { createAppAuth } = require("@octokit/auth-app");

const _module = {
  getMetadata: async (resource) => {
    const { PartitionKey } = resource;

    if (!/repository|extension/.test(PartitionKey)) {
      const msg = `[resourceMetadata.getMetadata] Unknown PartitionKey value: ${PartitionKey}`;
      throw new Error(msg);
    }

    if (/extension/.test(PartitionKey)) {
      resource = await getExtensionMetadata(resource);
    }

    const hasGitHubUrl =
    patterns.GITHUB.test(resource.githubUrl) ||
    patterns.GITHUB.test(resource.url);

    if (hasGitHubUrl) {
      resource = await getRepositoryMetadata(resource);
    }

    return resource;
  },

  /* ---------------------------------------- */

  getUsernameAndRepoName: (url) => {
    const pattern = /https?:\/\/github\.com\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)/;
    const [match, username, repoName] = url.match(pattern);
    return { username, repoName };
  },

  getExtensionMetadata: async (resource) => {
    try {
      const { data } = await axios.get(resource.url);

      let githubUrl = "";
      let description = "";
      let title = resource.RowKey; // default value in case title can't be found

      const gitHubUrlPattern = /(https:\/\/github\.com\/[\w\.@\:\/\-~]+)\/issues/;
      const gitHubUrlMatches = data.match(gitHubUrlPattern);
      if (gitHubUrlMatches) {
        [, githubUrl = ""] = gitHubUrlMatches;
      }

      const descriptionPattern = /<div class=\"ux-item-shortdesc\">(.*?)<\/div>/;
      const descriptionMatches = data.match(descriptionPattern);
      if (descriptionMatches) {
        [, description = ""] = descriptionMatches;
      }

      const titlePattern = /<span class=\"ux-item-name\">(.*?)<\/span>/;
      const titleMatches = data.match(titlePattern);
      if (titleMatches) {
        [, title = resource.RowKey] = titleMatches;
      }

      const metadata = {
        title,
        description,
        githubUrl,
      };

      const value = { ...resource, ...metadata };

      return value;
    } catch (exception) {
      throw exception;
    }
  },

  getRepositoryMetadata: async (resource) => {
    try {
      const url = resource.githubUrl || resource.url;
      const { username, repoName } = getUsernameAndRepoName(url);
      const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
      const installationId = resource.installationId;
      var metadata;
      if (installationId) {
        const appAuth = createAppAuth({
          appId: config.GH_APP_ID,
          privateKey: config.GH_APP_KEY
        });
        const instAuth = await appAuth({
          type: "installation",
          installationId: installationId
        });
        let res = await axios.get(apiUrl, {headers: {'Authorization': `token ${instAuth.token}`,'Accept': 'application/vnd.github.v3+json'}});
        metadata = res.data;
      } else {
        let res = await axios.get(apiUrl);
        metadata = res.data;
      }
      const lastUpdate = metadata.updated_at;

      resource.hasChanges = !!(resource.lastUpdate !== lastUpdate);

      resource.forks = metadata.forks_count;
      resource.issues = metadata.open_issues_count;
      resource.stars = metadata.stargazers_count;
      resource.watchers = metadata.watchers_count;
      resource.branch = metadata.default_branch;
      resource.lastUpdate = lastUpdate;

      delete resource[".metadata"];

      return resource;
    } catch (error) {
      console.log("\n\n");
      console.log(error);
      console.log(JSON.stringify(error));
      console.log("\n\n");
      throw error;
    }
  },
};

const {
  getExtensionMetadata,
  getRepositoryMetadata,
  getUsernameAndRepoName,
} = _module;

module.exports = _module;
