const { update } = require("../modules/entities/resourceService");

const _module = {
  run: async (message) => {
    return await update(message);
  },
};

module.exports = _module;
