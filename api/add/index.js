const { addUrlIfDoesNotExist } = require("./core");
const params = require("../modules/params");

module.exports = async function (context, req) {
  const url = params.get(req, "url");
  const response = await addUrlIfDoesNotExist(url);
  context.res = response;
  context.done();
};
