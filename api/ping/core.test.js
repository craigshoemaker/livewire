const { run } = require("./core");

test("run() should not return errors", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const branch = "default";
  const response = await run(url, branch);
  expect(response.errorCode).toBeFalsy();
});
