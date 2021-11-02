const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
  getReviews,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/:review_id").get(getReviewById).patch(updateVotesById);
reviewsRouter.route("/").get(getReviews);

module.exports = { reviewsRouter };
