const _module = {
  GITHUB_PATTERN: /https?\:\/\/github\.com\//,
  getKeyByUrl: (gitHubUrl) => {
    let key = gitHubUrl.replace(_module.GITHUB_PATTERN, "");
    key = key.replace("/", "-");
    return key;
  },
  createResource: (url) => {
    const key = _module.getKeyByUrl(url);
    return {
      PartitionKey: "repository",
      RowKey: key,
      url: url,
    };
  },
  isGitHubUrl: (url) => url.match(_module.GITHUB_PATTERN),
};

module.exports = _module;
