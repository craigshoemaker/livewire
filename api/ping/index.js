const { run } = require("./core");
const { get } = require("../modules/utils/params");

module.exports = async function (context, req) {
  try {
    const $ = (key) => get(req, key);
    await run($("url"), $("branch"));
    context.res = {
      body: "success",
    };
  } catch (ex) {
    context.res = {
      status: 500,
      body: JSON.stringify(ex),
    };
  }
};
