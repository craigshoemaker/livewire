const axios = require("axios").default;
const CONFIG_FILE_NAME = "livewire.config.json";
const config = require("../utils/config");
const { createAppAuth } = require("@octokit/auth-app");

const _module = {
  getGitHubAPIUrl: (url, branch, path) => {
    url = url
      .replace(/\/$/, "") // remove trailing slash
      .replace("//www.", "//")
      .replace("github.com", "raw.githubusercontent.com");

    path = path && path.length > 0 ? `${path}/` : '';

    url = `${url}/${branch}/${path}${CONFIG_FILE_NAME}`;

    return url;
  },

  deserialize: (data) => {
    const isNotJSON = !data.title;

    if (isNotJSON) {
      data = data.replace(/\,\n*\}/, "}"); // remove trailing commas at end of file
      data = JSON.parse(data);
    }

    return data;
  },

  getValues: async (resource) => {
    const url = resource.githubUrl || resource.url;
    const githubApiUrl = getGitHubAPIUrl(url, resource.branch, resource.path);

    try {
      let res;
      if (resource.installationId) {
        const appAuth = createAppAuth({
          appId: config.GH_APP_ID,
          privateKey: config.GH_APP_KEY
        });
        const instAuth = await appAuth({
          type: "installation",
          installationId: resource.installationId
        });
        res = await axios.get(githubApiUrl, {headers: {'Authorization': `token ${instAuth.token}`,'Accept': 'application/vnd.github.v3+json'}});
      } else {
        res = await axios.get(githubApiUrl);
      }
      data = deserialize(res.data);
      resource = { ...resource, ...data };
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

    return resource;
  },
};

const { getGitHubAPIUrl, deserialize } = _module;

module.exports = _module;
