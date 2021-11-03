const endpoints = require("../endpoints.json");

exports.listEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
