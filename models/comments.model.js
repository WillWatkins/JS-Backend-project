const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

exports.deleteCommentByCommentId = (id) => {
  let queryString = `
    DELETE FROM comments 
    WHERE comment_id = $1 RETURNING *`;
  return db.query(queryString, [id]).then(({ rows }) => {
    if (rows.length < 1) {
      return checkExists("comments", "comment_id", id);
    }
    return rows;
  });
  //Nothing to return as delete method cannot return a body
};
