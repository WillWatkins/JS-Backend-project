exports.handleCustomErrors = (err, req, res, next) => {
  const { status, message } = err;
  if (err.status) {
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error" });
};
