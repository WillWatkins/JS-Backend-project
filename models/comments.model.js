const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

exports.deleteCommentByCommentId = (id) => {
  let queryString = `
    DELETE FROM comments 
    WHERE comment_id = $1 RETURNING *`;
  return db.query(queryString, [id]).then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "Resource not found" });
    }
    return rows;
  });
  //Nothing to return as delete method cannot return a body
};

exports.updateCommentVotesByIdInModel = (commentId, vote = 0) => {
  if (typeof vote !== "number" || vote > 1 || vote < -1) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  let queryString = `
  UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING*;`;

  return db.query(queryString, [vote, commentId]).then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "Not found" });
    }
    return rows[0];
  });
};

exports.selectCommentsByReviewId = (id) => {
  let queryString = `SELECT * FROM comments WHERE review_id = $1`;
  return db.query(queryString, [id]).then(({ rows }) => {
    if (rows.length < 1) {
      return checkExists("reviews", "review_id", id);
    }
    return rows;
  });
};

exports.postCommentToReview = (id, comment) => {
  const { body, author } = comment;

  if (body === undefined || author === undefined) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  const queryString = `
      INSERT INTO comments (body, author, review_id)
      VALUES ($1 ,$2, $3) 
      RETURNING comment_id, author, body, votes, created_at;`;

  return db.query(queryString, [body, author, id]).then(({ rows }) => {
    console.log(rows[0]);
    return rows[0];
  });
};
