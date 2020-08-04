const dataService = require("../modules/entities/dataService");
const { update } = require("../modules/entities/repository");

const _module = {
  run: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await dataService.getCollection(
          null, // select all values
          "PartitionKey = repository" // only "repository" records
        );

        const { data: resources } = response;
        resources.forEach(async (resource) => {
          const { url, branch, version } = resource;
          await update(url, branch, version, resource);
        });
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = _module;
