const dataService = require("../modules/entities/dataService");
const { send } = require("../modules/messenger");
const { getChanges } = require("../modules/entities/resource");

const _module = {
  run: async () => {
    try {
      const response = await dataService.getCollection();
      const { repositories, extensions } = response;
      const resources = [...repositories, ...extensions];

      resources.forEach(async (resource) => {
        const changes = await getChanges(resource);
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
