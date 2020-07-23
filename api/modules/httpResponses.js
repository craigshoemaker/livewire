module.exports = {
  added: {
    status: 200,
    body: "Added",
  },
  branchRequired: {
    status: 400,
    body: "A branch name is required when adding a GitHub repository.",
  },
  error: {
    status: 500,
    body: "An error occurred while trying to to add the resource.",
  },
  exists: {
    status: 400,
    body: "URL already exists.",
  },
  custom: (status, message) => {
    return {
      status: status,
      body: message,
    };
  },
};
