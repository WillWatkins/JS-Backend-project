exports.handleCustomErrors = (err, req, res, next) => {
  const { status, message } = err;
  if (err.status) {
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(422).send({ message: "Unprocessable entity" });
  } else if (err.code) {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ message: "Internal server error" });
};
