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
};

module.exports = _module;
