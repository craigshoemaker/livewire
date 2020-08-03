module.exports = {
  get: (req, key) => {
    const query = req.query && req.query[key];
    const body = req.body && req.body[key];
    return query || body;
  },
};
