module.exports = {
  added: {
    status: 200,
    body: {
      message: "Added",
    },
  },
  branchRequired: {
    status: 400,
    body: {
      message: "A branch name is required when adding a GitHub repository.",
    },
  },
  error: {
    status: 500,
    body: {
      message: "An error occurred while trying to to add the resource.",
    },
  },
  exists: {
    status: 400,
    body: {
      message: "URL already exists.",
    },
  },
  custom: (status, message, options) => {
    let value = {
      status: status,
      body: { message: message },
    };

    if (options) {
      value.body = { ...value.body, ...options };
    }

    return value;
  },
};
