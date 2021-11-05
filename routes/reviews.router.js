const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
  getReviews,
  postReview,
} = require("../controllers/reviews.controller.js");
const { invalidMethod } = require("../utils/utils");

const {
  addCommentToReview,
  getCommentsByReviewId,
} = require("../controllers/comments.controller");

reviewsRouter.route("/").get(getReviews).post(postReview).all(invalidMethod);

reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(updateVotesById)
  .all(invalidMethod);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(addCommentToReview)
  .all(invalidMethod);

module.exports = { reviewsRouter };
