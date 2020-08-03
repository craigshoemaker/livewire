const axios = require("axios").default;
const httpResponses = require("./utils/httpResponses");

const CONFIG_FILE_NAME = "livewire.config.json";

const _module = {
  getURL: (url, branch) => {
    url = url
      .replace(/\/$/, "") // remove trailing slash
      .replace("//www.", "//")
      .replace("github.com", "raw.githubusercontent.com");

    url = `${url}/${branch}/${CONFIG_FILE_NAME}`;

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
        throw httpResponses.custom(
          200,
          `${CONFIG_FILE_NAME} not found at: ${configURL}`,
          { innerStatus: 404 }
        );
      } else {
        throw ex;
      }
    }

    return returnValue;
  },
};

module.exports = _module;
