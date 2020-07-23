const factory = require("../modules/resourceFactory");
const httpResponses = require("../modules/httpResponses");

const _module = {
  run: async (url, branch) => {
    let response = {};

    try {
      const resource = factory.create(url);
      response = await resource.tryAdd(url, branch);
    } catch (ex) {
      if (ex.status) {
        response = ex;
      } else {
        response = httpResponses.custom(500, JSON.stringify(ex));
      }
    }

    return response;
  },
};

module.exports = _module;
