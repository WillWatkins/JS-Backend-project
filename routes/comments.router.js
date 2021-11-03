const commentsRouter = require("express").Router();
const {
  removeCommentByCommentId,
} = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").delete(removeCommentByCommentId);

module.exports = { commentsRouter };
