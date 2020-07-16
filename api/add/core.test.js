const core = require("./core");

test("getKeyByURL should extract key from GitHub URL", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const key = core.getKeyByUrl(url);
  const expected = "craigshoemaker-livewire";
  expect(key).toBe(expected);
});

test("createResource should create data object from GitHub URL", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const resource = core.createResource(url);
  const expected = {
    PartitionKey: "repository",
    RowKey: "craigshoemaker-livewire",
    url: url,
  };
  expect(resource).toEqual(expected);
});
