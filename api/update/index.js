const { run } = require("./update");

module.exports = async function (context, message) {
  await run(message);
};
