const messenger = require("./messenger");

test("send() should send a queue message", async () => {
  const message = { title: "Test" };
  const { errorCode } = messenger.send(message);
  expect(errorCode).toBeFalsy();
});
