const {
  deleteCommentByCommentId,
  updateCommentVotesByIdInModel,
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
