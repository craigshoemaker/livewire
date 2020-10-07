const { run } = require("./detectChanges");

test("run() should not return an error code", async () => {
  await run();
});
