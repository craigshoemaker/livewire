const { addUrlIfDoesNotExist } = require("./core");
const { get } = require("../modules/params");

module.exports = async function (context, req) {
  const url = get(req, "url");
  const branch = get(req, "branch");
  const response = await addUrlIfDoesNotExist(url, branch);
  context.res = response;
  context.done();
};
