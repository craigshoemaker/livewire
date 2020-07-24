const { run } = require("./core");
const { get } = require("../modules/params");

module.exports = async function (context, req) {
  try {
    const $ = (key) => get(req, key);
    context.res = await run($("url"), $("branch"));
  } catch (ex) {
    context.res = ex;
  }
};
