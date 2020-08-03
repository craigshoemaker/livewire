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
    const response = await queue.sendMessage(JSON.stringify(message));
    return response;
  },
};

module.exports = _module;
