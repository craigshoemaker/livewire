const httpResponses = require("./httpResponses");

test("custom() should return custom response object.", () => {
  const response = httpResponses.custom(400, "invalid");
  expect(response.status).toBe(400);
  expect(response.body.message).toBe("invalid");
});
