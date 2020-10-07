const { send } = require("../modules/messenger");
const dataService = require("../modules/entities/dataService");
const resourceService = require("../modules/entities/resourceService");

const _module = {
  run: async (url) => {
    try {
      let resource = resourceService.getStarterObject(url);
      resource = await dataService.get(resource.PartitionKey, resource.RowKey);
      resource = await resourceService.getChanges(resource);
      if (resource.hasChanges) {
        await send(resource);
      }
    } catch (e) {
      throw e;
    }
  },
};

module.exports = _module;
