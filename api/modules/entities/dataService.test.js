const { get, add, remove } = require("./dataService");
const { v4: uuid } = require("uuid");

test("get() should return resource based on PartitionKey and RowKey values", async () => {
  const entity = await get("repository", "craigshoemaker-livewire");
  expect(entity.url).toBe("https://github.com/craigshoemaker/livewire");
});

test("get() should return an empty array if keys do not exist", async () => {
  const entity = await get("unknown", "unknown");
  expect(entity).toEqual({});
});

test("add() should create a table record", async () => {
  const resource = {
    PartitionKey: uuid(),
    RowKey: uuid(),
    url: "http://example.com",
  };
  const response = await add(resource);
  const actual = await get(resource.PartitionKey, resource.RowKey);
  await remove(resource.PartitionKey, resource.RowKey);
  expect(response[".metadata"]).toBeTruthy();
  expect(response[".metadata"].etag).toBeTruthy();
  expect(actual.url).toBe(resource.url);
});

test("remove() should delete a table record", async () => {
  const partitionKey = uuid();
  const rowKey = uuid();
  const resource = {
    PartitionKey: partitionKey,
    RowKey: rowKey,
    url: "http://example.com",
  };
  await add(resource);
  const response = await remove(resource.PartitionKey, resource.RowKey);
  expect(response.isSuccessful).toBeTruthy();
});
