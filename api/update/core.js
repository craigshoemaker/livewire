const { update } = require("../modules/entities/repository");

const _module = {
  run: async (message) => {
    await update(message);
  },
};

module.exports = _module;
