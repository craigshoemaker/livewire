const config = require("./config");

test("config should read from local.settings.json when not running in production.", async () => {
  const isMatch = /DefaultEndpointsProtocol=https;AccountName.*?EndpointSuffix=core\.windows\.net/.test(
    config.STORAGE_CONNECTION_STRING
  );
  expect(isMatch).toBeTruthy();
});
