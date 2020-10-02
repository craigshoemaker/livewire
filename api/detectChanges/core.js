const dataService = require("../modules/entities/dataService");
const { send } = require("../modules/messenger");
const { create } = require("../modules/entities/entityFactory");

const _module = {
  run: async () => {
    try {
      const response = await dataService.getCollection();
      const { repositories, extensions } = response;
      const resources = [...repositories, ...extensions];

      resources.forEach(async (resource) => {
        const entity = create(resource.url);
        const changes = await entity.getChanges(resource);
        if (changes.hasChanges) {
          await send(changes);
        }
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = _module;
