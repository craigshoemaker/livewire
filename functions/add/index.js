const { createResource } = require("./core");
const params = require("../modules/params");

module.exports = async function (context, req) {
  context.bindings.tableBinding = [];
  const url = params.get(req, url);
  const resource = createResource(url);
  context.bindings.tableBinding.push(resource);
  context.done();
};
