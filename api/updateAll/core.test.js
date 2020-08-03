const { run } = require("./core");

test("run() should not return an error code", async () => {
  const response = await run();
  expect(response.success).toBeTruthy();
});
