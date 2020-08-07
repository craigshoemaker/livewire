const { update } = require("../modules/entities/repository");

const _module = {
  run: async (message) => {
    return await update(message);
  },
};

module.exports = _module;
