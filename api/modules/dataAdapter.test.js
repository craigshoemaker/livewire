const adapter = require("./dataAdapter");

const original = {
  PartitionKey: {
    $: "Edm.String",
    _: "repository",
  },
  RowKey: {
    $: "Edm.String",
    _: "craigshoemaker-livewire",
  },
  Timestamp: {
    $: "Edm.DateTime",
    _: "2020-07-23T12:12:14.799Z",
  },
  url: {
    _: "https://github.com/craigshoemaker/livewire",
  },
  branch: {
    _: "default",
  },
  title: {
    _: "Livewire",
  },
  description: {
    _: "Microsoft internal content tools browser.",
  },
  categories: {
    _: '["Search"]',
  },
  languages: {
    _: '["JavaScript","HTML","CSS"]',
  },
  technologies: {
    _: '["Functions","Node.js","Vue.js"]',
  },
  ".metadata": {
    etag: "W/\"datetime'2020-07-23T12%3A12%3A14.7990715Z'\"",
  },
};

test("adapt() flattens data", () => {
  const result = adapter.adapt(original);
  expect(result.url).toBe(original.url._);
});

test("adapt() deserializes arrays", () => {
  const result = adapter.adapt(original);
  expect(Array.isArray(result.languages)).toBeTruthy();
});

test("adapt() should populate distinct list of array values", () => {
  const result = adapter.adapt(original);
  const facets = adapter.facets();
  const distinct = Array.from(new Set(facets.languages));
  expect(distinct).toEqual(facets.languages);
});
