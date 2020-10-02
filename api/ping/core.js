const { send } = require("../modules/messenger");
const { create } = require("../modules/entities/entityFactory");
const dataService = require("../modules/entities/dataService");

const _module = {
  run: async (url, branch) => {
    try {
      const entity = create(url);
      const resource = entity.create(url, branch);
      const { PartitionKey, RowKey } = resource;
      const data = await dataService.get(PartitionKey, RowKey);
      const changes = await entity.getChanges(data);
      if (changes.hasChanges) {
        await send(changes);
      }
    } catch (e) {
      throw e;
    }
  },
};

module.exports = _module;
