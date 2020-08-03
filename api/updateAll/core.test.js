const { updateAll } = require("./core");

test("updateAll() should not return an error code", async () => {
  const response = await updateAll();
  expect(response.success).toBeTruthy();
});
