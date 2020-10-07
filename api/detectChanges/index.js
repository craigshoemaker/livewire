const { run } = require("./detectChanges");

module.exports = async function (context, timer) {
  await run();
};
