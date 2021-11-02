const {
  selectReviewById,
  updateVotesInModelById,
  selectReviews,
} = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateVotesById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesInModelById(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

// exports.addCommentToReview = (req, res, next) => {
//   const { review_id } = req.params;
//   const comment = req.body;
//   postComment(review_id, comment)
//     .then((body) => {
//       res.status(201).send({ body });
//     })
//     .catch(next);
// };
