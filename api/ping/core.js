const {
  dispatchChanges,
  getRowKey,
} = require("../modules/entities/repository");
const { get } = require("../modules/entities/dataService");

const _module = {
  run: async (url, branch) => {
    const rowKey = getRowKey(url);
    const repository = await get("repository", rowKey);
    return await dispatchChanges(
      url,
      branch,
      "livewire.force.update",
      repository
    );
  },
};

module.exports = _module;
