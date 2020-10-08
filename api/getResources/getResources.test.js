const { get } = require("./getResources");

test("get() should return an array of data", async () => {
  const response = await get();
  expect(response.repositories.length > 0).toBeTruthy();
});
