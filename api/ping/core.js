const { update, getRowKey } = require("../modules/entities/repository");
const { get } = require("../modules/entities/dataService");

const _module = {
  run: async (url, branch) => {
    const rowKey = getRowKey(url);
    const { data: resource } = await get("repository", rowKey);
    return await update(url, branch, "livewire.force.update", resource);
  },
};

module.exports = _module;
