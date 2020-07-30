const data = require("../modules/resourcesData");

const _module = {
  get: async () => {
    const response = await data.get();
    return response;
  },
};

module.exports = _module;
