const { get } = require("./core");

module.exports = async function (context, req) {
  try {
    const data = await get();
    context.res = {
      body: data,
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: JSON.stringify(err),
    };
  }
};
