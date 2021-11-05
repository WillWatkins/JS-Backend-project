const commentsRouter = require("express").Router();
const {
  removeCommentByCommentId,
  updateCommentVotesById,
} = require("../controllers/comments.controller");
const { invalidMethod } = require("../utils/utils");

commentsRouter
  .route("/:comment_id")
  .delete(removeCommentByCommentId)
  .patch(updateCommentVotesById)
  .all(invalidMethod);

module.exports = { commentsRouter };
