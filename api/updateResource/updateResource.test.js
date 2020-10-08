const { run } = require("./updateResource");

test("run() should not return an error.", async () => {
  const message = {
    PartitionKey: "repository",
    RowKey: "craigshoemaker-livewire",
    Timestamp: "2020-08-03T13:28:03.788Z",
    branch: "default",
    categories: ["Search"],
    description: "Microsoft internal content tools browser.",
    languages: ["JavaScript", "HTML", "CSS"],
    technologies: ["Functions", "Node.js", "Vue.js"],
    title: "Livewire",
    url: "https://github.com/craigshoemaker/livewire",
    version: 2,
    videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    forks: 0,
    issues: 4,
    stars: 0,
    watchers: 0,
    lastUpdated: "2020-08-04T16:37:45Z",
  };

  const response = await run(message);
  expect(response.errorCode).toBeFalsy();
});
