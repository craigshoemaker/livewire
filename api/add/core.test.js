const core = require("./core");
const { remove } = require("../modules/resourcesData");
const { v4: uuid } = require("uuid");

let id1 = uuid();
let id2 = uuid();
const url = `http://github.com/${id1}/${id2}`;

test("getKeyByURL() should extract key from GitHub URL", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const key = core.getKeyByUrl(url);
  const expected = "craigshoemaker-livewire";
  expect(key).toBe(expected);
});

test("getKeyByURL() should extract key from VS Code marketplace URL", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const key = core.getKeyByUrl(url);
  const expected = "docsmsft.docs-authoring-pack";
  expect(key).toBe(expected);
});

test("createResource() should create data object from GitHub URL", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const resource = core.createResource(url);
  const expected = {
    PartitionKey: "extension",
    RowKey: "docsmsft.docs-authoring-pack",
    url: url,
  };
  expect(resource).toEqual(expected);
});

test("createResource() should create data object from GitHub URL", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const resource = core.createResource(url);
  const expected = {
    PartitionKey: "repository",
    RowKey: "craigshoemaker-livewire",
    url: url,
  };
  expect(resource).toEqual(expected);
});

test("isGitHubURL() validates GitHub URLs", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const isMatch = core.isGitHubUrl(url);
  expect(isMatch).toBeTruthy();
});

test("isGitHubURL() does not validate non-GitHub URLs", async () => {
  const url = "https://gitlab.com/craigshoemaker/livewire";
  const isMatch = core.isGitHubUrl(url);
  expect(isMatch).toBeFalsy();
});

test("addUrlIfDoesNotExist() adds a new URL", async () => {
  const response = await core.addUrlIfDoesNotExist(url);
  expect(response.status).toBe(200);
});

test("addUrlIfDoesNotExist() rejects an existing URL", async () => {
  const response = await core.addUrlIfDoesNotExist(url);
  expect(response.status).toBe(400);
});

test("addUrlIfDoesNotExist() rejects a URL in the wrong form", async () => {
  let url = "http://example.com";
  const response = await core.addUrlIfDoesNotExist(url);
  expect(response.status).toBe(400);
});

afterAll(async () => {
  await remove("repository", `${id1}-${id2}`);
});
