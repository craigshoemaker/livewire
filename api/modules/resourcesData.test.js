const { get, add, remove } = require("./resourcesData");
const { v4: uuid } = require("uuid");

test("get() returns resource based on PartitionKey and RowKey values", async () => {
  const resource = await get("repository", "craigshoemaker-livewire");
  expect(resource.url._).toBe("https://github.com/craigshoemaker/livewire");
});

test("get() returns empty object if keys do not exist", async () => {
  const resource = await get("unknown", "unknown");
  expect(resource).toEqual({});
});

test("add() creates a table record", async () => {
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
  expect(actual.url._).toBe(resource.url);
});

test("remove() deletes a table record", async () => {
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
