const config = require("./config");
const axios = require("axios").default;
const { createAppAuth } = require("@octokit/auth-app");

const ghAppAuth = createAppAuth({
  appId: config.GH_APP_ID,
  privateKey: config.GH_APP_KEY
});

const _module = {
  getGHInstallationToken: async (installationId) => {
    const options = {
      type: "installation",
      installationId: installationId
    };

    const { token } = await ghAppAuth(options);
    return token;
  },

  getGHAppToken: async () => {
    const { token } = await ghAppAuth({ type: "app" });
    return token;
  },

  getGHInstallationID: async (orgId) => {
    const appToken = await getGHAppToken();
    let instId = 0;

    // TODO: Enable pagination if installs ever exceeds 100 (max per page)
    const options = {
      headers: {
        'Authorization': `Bearer ${appToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'per_page': 100
      }
    };

    const { data } = await axios.get("https://api.github.com/app/installations", options);

    data.forEach((installation) => {
      if (installation.target_type === 'User' && installation.account.login.toLowerCase() === orgId.toLowerCase()) {
        instId = installation.id;
      }
    });

    return instId;
  },

  isGHAppInstalledRepo: async (instId, repoName) => {
    const instToken = await getGHInstallationToken(instId);
    let matchedRepo = false;

    // TODO: Enable pagination if enabled repos for a single installation ever exceeds 100 (max per page)
    const { data } = await axios.get("https://api.github.com/installation/repositories", { headers: { 'Authorization': `token ${instToken}`, 'Accept': 'application/vnd.github.v3+json', 'per_page': 100 } });

    data.repositories.forEach((repository) => {
      if (repository.name === repoName) {
        matchedRepo = true;
      }
    });

    return matchedRepo;
  }
};

const {
  getGHInstallationToken,
  getGHAppToken,
  getGHInstallationID,
  isGHAppInstalledRepo
} = _module;

module.exports = _module;