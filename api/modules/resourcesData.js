const storage = require("azure-storage");
const config = require("./config");

const dataService = storage.createTableService(
  config.STORAGE_CONNECTION_STRING
);
const gen = storage.TableUtilities.entityGenerator;

let TABLE_NAME = "resources";

if (!!!process.env.PRODUCTION) {
  TABLE_NAME = `${TABLE_NAME}DEV`;
}

const _module = {
  get: (partitionKey, rowKey) => {
    return new Promise((resolve, reject) => {
      try {
        const query = new storage.TableQuery()
          .top(1)
          .where("PartitionKey eq ?", partitionKey)
          .and("RowKey eq ?", rowKey);

        dataService.queryEntities(
          TABLE_NAME,
          query,
          null,
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              let value = {};
              if (response.entries.length === 1) {
                value = response.entries[0];
              }
              resolve(value);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },
  add: (resource) => {
    // TODO: need to support different types (Boolean, Ints), when necessary

    return new Promise((resolve, reject) => {
      const dto = {};
      for (let prop in resource) {
        dto[prop] = gen.String(resource[prop]);
      }

      dataService.insertEntity(TABLE_NAME, dto, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  remove: (partitionKey, rowKey) => {
    return new Promise((resolve, reject) => {
      const resource = {
        PartitionKey: { _: partitionKey },
        RowKey: { _: rowKey },
      };

      dataService.deleteEntity(TABLE_NAME, resource, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  },
};

module.exports = _module;
