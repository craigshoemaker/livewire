const resource = require("./repository");
const { add, remove } = require("./dataService");

beforeAll(async () => {
  const value = resource.create("http://github.com/test/test", "default");
  await add(value);
});

afterAll(async () => {
  await remove("repository", `test-test`);
});

test("type should be 'repository'", async () => {
  expect(resource.type).toBe("repository");
});

test("create() should return object", async () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const branch = "default";
  const value = resource.create(url, branch);
  expect(value.PartitionKey).toBe("repository");
  expect(value.RowKey).toBe("craigshoemaker-livewire");
  expect(value.url).toBe(url);
  expect(value.branch).toBe(branch);
});

test("exists() should return true if data is in the database", async () => {
  const exists = await resource.exists("repository", "test-test");
  expect(exists).toBeTruthy();
});

test("exists() should return false if data the database", async () => {
  const exists = await resource.exists("repository", "does-not-exist");
  expect(exists).toBeFalsy();
});

test("getRowKey() should return formatted value", () => {
  const url = "https://github.com/craigshoemaker/livewire";
  const key = resource.getRowKey(url);
  expect(key).toBe("craigshoemaker-livewire");
});

test("validate() should return message if invalid URL.", async () => {
  const value = resource.validate("http://example.com", "default");
  expect(value.status).toBe(400);
});

test("validate() should return message if branch name is missing.", async () => {
  const url = "http://github.com/craigshoemaker/livewire";
  const value = resource.validate(url);
  expect(value.status).toBe(400);
});

test("validate() should return null if no rules are broken.", async () => {
  const url = "http://github.com/craigshoemaker/livewire";
  const value = resource.validate(url, "default");
  expect(value).toBeNull();
});
