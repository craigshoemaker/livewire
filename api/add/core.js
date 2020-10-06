const { add } = require("../modules/entities/resourceService");
const httpResponses = require("../modules/utils/httpResponses");

const _module = {
  run: async (url) => {
    let response = {};

    try {
      response = await add(url);
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
