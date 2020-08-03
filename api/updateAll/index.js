const { updateAll } = require("./core");

module.exports = async function (context, timer) {
  const response = await updateAll();
  if (response.errorCode) {
    throw new Error(response.errorCode);
  }
};
