const factory = require("./entityFactory");

test("create() should return a repository when given a GitHub URL", async () => {
  const url = "http://github.com/craigshoemaker/livewire";
  const resource = factory.create(url);
  expect(resource.type).toBe("repository");
});

test("create() should return a extension when given a VS Code marketplace URL", async () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const resource = factory.create(url);
  expect(resource.type).toBe("extension");
});
