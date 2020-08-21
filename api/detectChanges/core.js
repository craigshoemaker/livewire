const dataService = require("../modules/entities/dataService");
const { dispatchChanges } = require("../modules/entities/repository");

const _module = {
  run: async () => {
    const response = await dataService.getCollection(
      null, // select all values
      "PartitionKey = repository" // only "repository" records
    );

    const { repositories } = response;
    repositories.forEach(async (resource) => {
      const { url, branch, version } = resource;
      await dispatchChanges(url, branch, version, resource);
    });
  },
};

module.exports = _module;
