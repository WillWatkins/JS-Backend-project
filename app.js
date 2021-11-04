const express = require("express");
const app = express();
const { apiRouter } = require("./routes/api.router.js");
const {
  handleCustomErrors,
  handle500,
  handlePsqlErrors,
} = require("./controllers/errors.controller");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500);

app.all("/*", (req, res) => {
  res.status(500).send({ status: 500, message: "Internal server error" });
});

module.exports = app;
