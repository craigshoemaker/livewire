const {
  QueueServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-queue");

const {
  STORAGE_ACCOUNT_KEY: storageKey,
  STORAGE_ACCOUNT_NAME: accountName,
} = require("./utils/config");

let QUEUE_NAME = "messages";

if (!process.env.PRODUCTION) {
  QUEUE_NAME = `${QUEUE_NAME}-dev`;
}

const _module = {
  send: async (message) => {
    const credentials = new StorageSharedKeyCredential(accountName, storageKey);
    const url = `https://${accountName}.queue.core.windows.net`;
    const client = new QueueServiceClient(url, credentials);
    const queue = client.getQueueClient(QUEUE_NAME);

    let base64 = Buffer.from(JSON.stringify(message));
    base64 = base64.toString("base64");

    const response = await queue.sendMessage(base64);
    return response;
  },
};

module.exports = _module;
