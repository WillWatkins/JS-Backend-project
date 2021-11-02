const {
  selectReviewById,
  updateVotesInModelById,
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
