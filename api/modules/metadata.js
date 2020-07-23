const axios = require("axios").default;
const httpResponses = require("./httpResponses");

const _module = {
  getURL: (url, branch) => {
    url = url
      .replace(/\/$/, "") // remove trailing slash
      .replace("//www.", "//")
      .replace("github.com", "raw.githubusercontent.com");

    url = `${url}/${branch}/livewire.config.json`;

    return url;
  },

  getConfig: async (url, branch) => {
    let returnValue = {};
    let configURL;

    try {
      configURL = _module.getURL(url, branch);
      const response = await axios.get(configURL);
      returnValue = response.data;
    } catch (ex) {
      if (ex.isAxiosError && ex.response.data && /404/.test(ex.response.data)) {
        throw httpResponses.custom(404, `File not found at: ${readmeURL}`);
      } else {
        throw ex;
      }
    }

    return returnValue;
  },
};

module.exports = _module;
