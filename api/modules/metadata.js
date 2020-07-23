const axios = require("axios").default;
const httpResponses = require("./httpResponses");

const _module = {
  readmeURL: (url, branch) => {
    url = url
      .replace(/\/$/, "") // remove trailing slash
      .replace("//www.", "//")
      .replace("github.com", "raw.githubusercontent.com");

    url = `${url}/${branch}/readme.md`;

    return url;
  },

  extract: (text) => {
    let metadata = text.replace(/^---\n/, "");
    metadata = metadata.substring(0, metadata.indexOf("-") - 1);

    const lines = metadata.split("\n");
    const block = lines.map((line) => {
      if (line.length > 0) {
        line = line.replace(/([A-Za-z0-9]*): ?(.*)/g, `"$1": "$2"`);
        return line;
      }
    });

    let json = block.join(",");
    json = JSON.parse(`{${json}}`); // add brackets for json

    return json;
  },

  getReadme: async (url, branch) => {
    let returnValue = {};
    let readmeURL;

    try {
      readmeURL = _module.readmeURL(url, branch);
      const response = await axios.get(readmeURL);
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

  extractFromReadme: async (url, branch) => {
    let json = {};
    const text = await _module.getReadme(url, branch);

    if (/title/.test(text)) {
      json = _module.extract(text);
    }

    return json;
  },
};

module.exports = _module;
