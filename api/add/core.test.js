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

test("isGitHub URL validates GitHub URLs", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const isMatch = core.isGitHubUrl(url);
  expect(isMatch).toBeTruthy();
});

test("isGitHub URL does not validate non-GitHub URLs", async () => {
  const url = "https://gitlab.com/craigshoemaker/livewire";
  const isMatch = core.isGitHubUrl(url);
  expect(isMatch).toBeFalsy();
});
