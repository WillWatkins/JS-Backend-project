const db = require("../db/connection");

exports.selectReviewById = (id) => {
  const queryString = `SELECT reviews.*, COUNT(comments.review_id) AS number_of_comments
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`;
  return db.query(queryString, [id]).then(({ rows }) => {
    return rows;
  });
};

exports.updateVotesInModelById = (id, voteChange) => {
  if (!id.match(/[0-9]*/) || typeof voteChange !== "number") {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  const queryString = `
  UPDATE reviews
  SET votes = votes + ${voteChange}
  WHERE review_id = ${id}
  RETURNING*;`;
  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};
