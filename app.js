const express = require("express");
const app = express();
const { apiRouter } = require("./routes/api.router.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({ message: "internal server error" });
});

module.exports = app;
