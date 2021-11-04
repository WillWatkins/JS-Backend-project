const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
  getReviews,
} = require("../controllers/reviews.controller.js");

const {
  addCommentToReview,
  getCommentsByReviewId,
} = require("../controllers/comments.controller");

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id").get(getReviewById).patch(updateVotesById);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(addCommentToReview);

module.exports = { reviewsRouter };
