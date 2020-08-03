const factory = require("./resourceFactory");

test("create() should return a repositoryResource when given a GitHub URL", async () => {
  const url = "http://github.com/craigshoemaker/livewire";
  const resource = factory.create(url);
  expect(resource.type).toBe("repository");
});

test("create() should return a extensionResource when given a VS Code marketplace URL", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const resource = factory.create(url);
  expect(resource.type).toBe("extension");
});

// test("create() should should throw an error when given an unexpected URL pattern.", async () => {
//   const url = "https://example.com";
//   expect(factory.create(url)).toThrow();
// });
