const { get } = require("./core");

/*
  returns
  -----------------------
  {
    data: []
    facets: []
  }
*/

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
