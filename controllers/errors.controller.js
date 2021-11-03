exports.handleCustomErrors = (err, req, res, next) => {
  const { status, message } = err;
  if (err.status) {
    console.log("CUSTOM ERROR:", err);
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code) {
    console.log("PSQL ERROR:", err);
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log("500 ERROR:", err);
  res.status(500).send({ message: "Internal server error" });
};
