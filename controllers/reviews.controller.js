const {
  selectReviewById,
  updateVotesInModelById,
  selectReviews,
  selectCommentsByReviewId,
  postCommentToReview,
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

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addCommentToReview = (req, res, next) => {
  const { review_id } = req.params;
  const comment = req.body;
  postCommentToReview(review_id, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
