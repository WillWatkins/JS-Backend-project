exports.listEndpoints = (req, res, next) => {
  const endpoints = [
    { path: "/api", methods: ["GET"] },
    { path: "/api/categories", methods: ["GET"] },
    { path: "/api/reviews", methods: ["GET"] },
    { path: "/api/reviews/:review_id", methods: ["GET", "PATCH"] },
    { path: "/api/reviews/:review_id/comments", methods: ["GET", "POST"] },
    { path: "/api/comments/:comment_id", methods: ["DELETE"] },
  ];
  res.status(200).send({ endpoints });
};
