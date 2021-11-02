const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
  getReviews,
  addCommentToReview,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/:review_id").get(getReviewById).patch(updateVotesById);
reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id/comments");
//.post(addCommentToReview);

module.exports = { reviewsRouter };
