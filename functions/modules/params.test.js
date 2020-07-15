const params = require("./params");

test("params.get should read querystring values", async () => {
  const value = "https://github.com/craigshoemaker/livewire";

  const req = {
    query: {
      url: value,
    },
  };

  const url = params.get(req, "url");
  expect(url).toBe(value);
});

test("params.get should read body values", async () => {
  const value = "https://github.com/craigshoemaker/livewire";

  const req = {
    body: {
      url: value,
    },
  };

  const url = params.get(req, "url");
  expect(url).toBe(value);
});
