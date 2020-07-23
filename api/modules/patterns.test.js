const patterns = require("./patterns");

test("GitHub pattern should match GitHub URL", () => {
  const url = "https://github.com/";
  const result = patterns.GITHUB.test(url);
  expect(result).toBeTruthy();
});

test("GitHub pattern should match GitHub URL", () => {
  const url =
    "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack";
  const result = patterns.VSCODE_MARKETPLACE.test(url);
  expect(result).toBeTruthy();
});
