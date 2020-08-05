const { run } = require("./core");
const { get } = require("../modules/utils/params");

module.exports = async function (context, req) {
  try {
    const $ = (key) => get(req, key);
    const response = await run($("url"), $("branch"));

    if (!response.errorCode) {
      context.res = {
        body: "success",
      };
    } else {
      context.res = {
        status: 500,
        body: response.errorCode,
      };
    }
  } catch (ex) {
    context.res = {
      status: 500,
      body: JSON.stringify(ex),
    };
  }
};
