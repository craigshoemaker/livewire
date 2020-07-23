const { getURL, getConfig } = require("./metadata");

test("getURL() should transform GitHub URL to raw URL to livewire.config.json", () => {
  const url = getURL("https://github.com/craigshoemaker/livewire", "default");
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/livewire.config.json"
  );
});

test("getURL() should transform GitHub URL (with trailing slash) to raw URL to livewire.config.json", () => {
  const url = getURL("https://github.com/craigshoemaker/livewire/", "default");
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/livewire.config.json"
  );
});

test("getURL() should transform GitHub URL (with www.) to raw URL to livewire.config.json", () => {
  const url = getURL(
    "https://www.github.com/craigshoemaker/livewire",
    "default"
  );
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/livewire.config.json"
  );
});
