const express = require("express");
const app = express();
const { apiRouter } = require("./routes/api.router.js");
const {
  handleCustomErrors,
  handle500,
} = require("./controllers/errors.controller");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handle500);

module.exports = app;
