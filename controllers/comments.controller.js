const { deleteCommentByCommentId } = require("../models/comments.model");

exports.removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id).then(() => {
    res.status(204).send();
  });
};
