const config = require("./config");

test("config should read from local.settings.json when not running in production.", async () => {
  const isMatch = config.STORAGE_CONNECTION_STRING.match(
    /DefaultEndpointsProtocol=https;AccountName.*?EndpointSuffix=core\.windows\.net/
  );
  expect(isMatch).toBeTruthy();
});
