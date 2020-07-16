const _module = {
  getKeyByUrl: (gitHubUrl) => {
    let key = gitHubUrl.replace(/https?\:\/\/github\.com\//, "");
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
};

module.exports = _module;
