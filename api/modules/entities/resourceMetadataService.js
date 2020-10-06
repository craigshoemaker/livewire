const axios = require("axios").default;

const _module = {
  getMetadata: async (resource) => {
    const { PartitionKey } = resource;

    if (!/repository|extension/.test(PartitionKey)) {
      throw new Error(
        `[resourceMetadata.getMetadata] Unknown PartitionKey value: ${PartitionKey}`
      );
    }

    if (/extension/.test(PartitionKey)) {
      resource = await getExtensionMetadata(resource);
    }

    return await getRepositoryMetadata(resource);
  },

  /* ---------------------------------------- */

  getUsernameAndRepoName: (url) => {
    const pattern = /https?:\/\/github\.com\/([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)/;
    const [match, username, repoName] = url.match(pattern);
    return { username, repoName };
  },

  getExtensionMetadata: async (resource) => {
    const { RowKey: id } = resource;
    const url = `https://marketplace.visualstudio.com/items?itemName=${id}`;
    const { data } = await axios.get(url);

    const githubUrlMatches = data.match(/https:\/\/github\.com\/(.*?)\.git/);
    const [githubUrl] = githubUrlMatches;

    const descriptionMatches = data.match(
      /<div class=\"ux-item-shortdesc\">(.*?)<\/div>/
    );
    const [dMatch, description] = descriptionMatches;

    const titleMatches = data.match(
      /<span class=\"ux-item-name\">(.*?)<\/span>/
    );
    const [tMatch, title] = titleMatches;

    const metadata = {
      title,
      description,
      version: "unknown",
      githubUrl: githubUrl.replace(".git", ""),
    };

    const value = { ...resource, ...metadata };

    return value;
  },

  getRepositoryMetadata: async (resource) => {
    const url = resource.githubUrl || resource.url;
    const { username, repoName } = getUsernameAndRepoName(url);
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
    const { data: metadata } = await axios.get(apiUrl);
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
  },
};

const {
  getExtensionMetadata,
  getRepositoryMetadata,
  getUsernameAndRepoName,
} = _module;

module.exports = _module;
