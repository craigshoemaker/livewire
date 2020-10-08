const { get } = require("../modules/entities/dataService");

const _module = {
  get: async () => {
    const response = await get();
    return response;
  },
};

module.exports = _module;
