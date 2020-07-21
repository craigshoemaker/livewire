const { readmeURL, extract } = require("./metadata");

test("readmeURL() should transform GitHub URL to raw URL to readme.md", () => {
  const url = readmeURL(
    "https://github.com/craigshoemaker/livewire",
    "default"
  );
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/readme.md"
  );
});

test("readmeURL() should transform GitHub URL (with trailing slash) to raw URL to readme.md", () => {
  const url = readmeURL(
    "https://github.com/craigshoemaker/livewire/",
    "default"
  );
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/readme.md"
  );
});

test("readmeURL() should transform GitHub URL (with www.) to raw URL to readme.md", () => {
  const url = readmeURL(
    "https://www.github.com/craigshoemaker/livewire",
    "default"
  );
  expect(url).toBe(
    "https://raw.githubusercontent.com/craigshoemaker/livewire/default/readme.md"
  );
});

test("extract() should format metadata as json object", async () => {
  const text = `---
title: Livewire
description: Microsoft internal content tools browser.
categories: Search
languages: JavaScript, HTML, CSS
technologies: Functions, Node.js, Vue.js
---

![Livewire: Microsoft internal content tools browser](./livewire-logo.png)`;

  const json = extract(text);
  expect(json).toBeTruthy();
  expect(json.title).toBe("Livewire");
});
