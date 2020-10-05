const axios = require("axios").default;
const { getMetadata } = require("./resourceMetadata");

const CONFIG_FILE_NAME = "livewire.config.json";

const _module = {
  getChanges: async (resource) => {
    resource = await getMetadata(resource);

    if (/repository/.test(resource.PartitionKey)) {
      resource = await getLivewireMetadataValues(resource);
    }

    return resource;
  },

  /* ---------------------------- */

  getGitHubAPIUrl: (url, branch) => {
    url = url
      .replace(/\/$/, "") // remove trailing slash
      .replace("//www.", "//")
      .replace("github.com", "raw.githubusercontent.com");

    url = `${url}/${branch}/${CONFIG_FILE_NAME}`;

    return url;
  },

  getLivewireMetadataValues: async (resource) => {
    let returnValue = {};
    let githubApiUrl;

    const url = resource.githubUrl || resource.url;

    try {
      githubApiUrl = getGitHubAPIUrl(url, resource.branch);
      const { data } = await axios.get(githubApiUrl);
      returnValue = { ...resource, ...data };
    } catch (ex) {
      if (ex.isAxiosError && ex.response.data && /404/.test(ex.response.data)) {
        throw httpResponses.custom(
          200,
          `${CONFIG_FILE_NAME} not found at: ${githubApiUrl}`,
          { innerStatus: 404 }
        );
      } else {
        throw ex;
      }
    }

    return returnValue;
  },
};

const { getGitHubAPIUrl, getLivewireMetadataValues } = _module;

module.exports = _module;
