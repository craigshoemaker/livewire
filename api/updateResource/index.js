const { run } = require("./updateResource");

module.exports = async function (context, message) {
  await run(message);
};
