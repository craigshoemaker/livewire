const dataService = require("../modules/entities/dataService");
const messenger = require("../modules/messenger");
const resourceService = require("../modules/entities/resourceService");

const _module = {
  run: async () => {
    try {

      // TODO: filter for monorepos
      //   If repo shows as changed, but only one project
      //   in a monorepo is actually updated, then the rest
      //   of the projects in the monorepo will be updated
      //   as well, wasting cycles and resources
      
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
