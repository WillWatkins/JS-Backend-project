const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateVotesById,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/:review_id").get(getReviewById).patch(updateVotesById);

module.exports = { reviewsRouter };
