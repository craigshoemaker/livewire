const { run } = require("./core");

test("run() should not return an error code", async () => {
  await run();
});
