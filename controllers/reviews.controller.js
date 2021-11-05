const {
  selectReviewById,
  updateVotesInModelById,
  selectReviews,
  insertReview,
} = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.updateVotesById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesInModelById(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category, limit, page } = req.query;
  selectReviews(sort_by, order, category, limit, page)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.postReview = (req, res, next) => {
  const reviewInput = req.body;
  insertReview(reviewInput)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch(next);
};
