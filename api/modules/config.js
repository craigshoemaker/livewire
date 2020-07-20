const { readFileSync } = require("fs");
const { join } = require("path");

let storageConnectionString = "";

if (process.env.PRODUCTION) {
  storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
} else {
  const filePath = join(__dirname, "../local.settings.json");
  const file = readFileSync(filePath, "utf8");
  const localConfig = JSON.parse(file);
  storageConnectionString = localConfig.Values.STORAGE_CONNECTION_STRING;
}

module.exports = {
  STORAGE_CONNECTION_STRING: storageConnectionString,
};
