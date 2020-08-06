const resource = require("./extension");
const { add, remove } = require("./dataService");

//https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack

beforeAll(async () => {
  const value = resource.create(
    "https://marketplace.visualstudio.com/items?itemName=test"
  );
  await add(value);
});

afterAll(async () => {
  await remove("extension", `test`);
});

test("type should be 'repository'", async () => {
  expect(resource.type).toBe("extension");
});

test("create() should return object", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const value = resource.create(url);
  expect(value.PartitionKey).toBe("extension");
  expect(value.RowKey).toBe("docsmsft.docs-authoring-pack");
  expect(value.url).toBe(url);
});

test("exists() should return true if data is in the database", async () => {
  const exists = await resource.exists("extension", "test");
  expect(exists).toBeTruthy();
});

test("exists() should return false if data is not in the database", async () => {
  const exists = await resource.exists("extension", "does-not-exist");
  expect(exists).toBeFalsy();
});

test("getRowKey() should return formatted value", () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const key = resource.getRowKey(url);
  expect(key).toBe("docsmsft.docs-authoring-pack");
});

test("validate() should return message if invalid URL.", async () => {
  const value = resource.validate("http://example.com", "default");
  expect(value.status).toBe(400);
});

test("validate() should return null if no rules are broken.", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const value = resource.validate(url, "default");
  expect(value).toBeNull();
});
