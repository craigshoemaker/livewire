const { readFileSync } = require("fs");
const { join } = require("path");

let storageConnectionString = "";
let storageAccountName = "";
let storageAccountKey;

if (process.env.PRODUCTION) {
  storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
  storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
  storageAccountKey = process.env.STORAGE_ACCOUNT_KEY;
} else {
  const filePath = join(__dirname, "../local.settings.json");
  const file = readFileSync(filePath, "utf8");
  const localConfig = JSON.parse(file);
  storageConnectionString = localConfig.Values.STORAGE_CONNECTION_STRING;
  storageAccountName = localConfig.Values.STORAGE_ACCOUNT_NAME;
  storageAccountKey = localConfig.Values.STORAGE_ACCOUNT_KEY;
}

module.exports = {
  STORAGE_CONNECTION_STRING: storageConnectionString,
  STORAGE_ACCOUNT_NAME: storageAccountName,
  STORAGE_ACCOUNT_KEY: storageAccountKey,
};
