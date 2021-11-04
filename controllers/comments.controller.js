const {
  deleteCommentByCommentId,
  updateCommentVotesByIdInModel,
  selectCommentsByReviewId,
  postCommentToReview,
} = require("../models/comments.model");

exports.removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.updateCommentVotesById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentVotesByIdInModel(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
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
