const db = require("../db/connection");

exports.deleteCommentByCommentId = (id) => {
  let queryString = `
    DELETE FROM comments 
    WHERE comment_id = $1 RETURNING *`;
  return db.query(queryString, [id]);
  //Nothing to return as delete method cannot return a body
};
