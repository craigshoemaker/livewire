const { run } = require("./core");

module.exports = async function (context, timer) {
  const response = await run();
  if (response.errorCode) {
    throw new Error(response.errorCode);
  }
};
