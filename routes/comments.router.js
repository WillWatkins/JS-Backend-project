const commentsRouter = require("express").Router();
const {
  removeCommentByCommentId,
  updateCommentVotesById,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .delete(removeCommentByCommentId)
  .patch(updateCommentVotesById);

module.exports = { commentsRouter };
