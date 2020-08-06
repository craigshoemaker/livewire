const { run } = require("./core");

module.exports = async function (context, message) {
  await run(message);
};
