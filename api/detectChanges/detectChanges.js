const dataService = require("../modules/entities/dataService");
const messenger = require("../modules/messenger");
const resourceService = require("../modules/entities/resourceService");

const _module = {
  run: async () => {
    try {
      const response = await dataService.getCollection();
      const { repositories, extensions } = response;
      const resources = [...repositories, ...extensions];

      resources.forEach(async (resource) => {
        const changes = await resourceService.getChanges(resource);
        if (changes.hasChanges) {
          delete changes.hasChanges;
          await messenger.send(changes);
        }
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = _module;
