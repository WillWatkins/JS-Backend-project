const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
  getReviews,
  addCommentToReview,
  getCommentsByReviewId,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/").get(getReviews);

//New router for /:review_id?
reviewsRouter.route("/:review_id").get(getReviewById).patch(updateVotesById);

//New router for comments?
reviewsRouter.route("/:review_id/comments").get(getCommentsByReviewId);
//.post(addCommentToReview);

module.exports = { reviewsRouter };
