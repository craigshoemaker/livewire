const { createResource, isGitHubUrl, isExtensionUrl } = require("./core");
const params = require("../modules/params");

module.exports = async function (context, req) {
  const url = params.get(req, "url");
  if (isGitHubUrl(url) || isExtensionUrl(url)) {
    const resource = createResource(url);
    context.bindings.tableBinding = [];
    context.bindings.tableBinding.push(resource);
    context.done();
  } else {
    context.res = {
      status: 400,
      body:
        "A GitHub repository or Visual Studio Code extension marketplace URL is required.",
    };
  }
};
