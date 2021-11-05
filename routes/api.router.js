const apiRouter = require("express").Router();
const { categoriesRouter } = require("./categories.router.js");
const { reviewsRouter } = require("./reviews.router.js");
const { commentsRouter } = require("./comments.router");
const { usersRouter } = require("./users.router");
const { listEndpoints } = require("../controllers/api.controller.js");
const { invalidMethod } = require("../utils/utils");

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.route("/").get(listEndpoints).all(invalidMethod);

module.exports = { apiRouter };
