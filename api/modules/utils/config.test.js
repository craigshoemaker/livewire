const config = require("./config");

test("config should read Connection String from local.settings.json when not running in production.", async () => {
  const isMatch = /DefaultEndpointsProtocol=https;AccountName.*?EndpointSuffix=core\.windows\.net/.test(
    config.STORAGE_CONNECTION_STRING
  );
  expect(isMatch).toBeTruthy();
});

test("config should read Account Name from local.settings.json when not running in production.", async () => {
  const isMatch = /livewireapp/.test(config.STORAGE_ACCOUNT_NAME);
  expect(isMatch).toBeTruthy();
});

test("config should read Account Key from local.settings.json when not running in production.", async () => {
  const isMatch = config.STORAGE_ACCOUNT_KEY !== "";
  expect(isMatch).toBeTruthy();
});
