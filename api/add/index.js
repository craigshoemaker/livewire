const { run } = require("./core");
const { get } = require("../modules/params");

module.exports = async function (context, req) {
  try {
    const url = get(req, "url");
    const branch = get(req, "branch");
    const response = await run(url, branch);
    context.res = response;
  } catch (ex) {
    context.res = ex;
  }
  context.done();
};
