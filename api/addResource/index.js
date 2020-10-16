const { run } = require("./addResource");
const { get } = require("../modules/utils/params");

module.exports = async function (context, req) {
  try {
    const $ = (key) => get(req, key);
    context.res = await run($("url"));
  } catch (ex) {
    context.res = ex;
  }
};
