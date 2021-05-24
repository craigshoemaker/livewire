const { run } = require("./addResource");
const { get } = require("../modules/utils/params");

module.exports = async function (context, req) {
  try {
    const $ = (key) => get(req, key);
    context.res = await run($("url"));
  } catch (ex) {
    context.log(`addResource error`);
    context.log(ex);
    context.log(JSON.stringify(ex));
    context.res = JSON.stringify(ex);
  }
};
