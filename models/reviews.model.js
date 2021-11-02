const db = require("../db/connection");

exports.selectReviewById = (id) => {
  const queryString = `SELECT reviews.*, COUNT(comments.review_id)::int AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`;
  return db.query(queryString, [id]).then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({ status: 400, message: "Invalid path" });
    }
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

exports.selectReviews = (sort_by = "created_at", order = "asc") => {
  //const queryParams = [];

  //Cast a function output with :: e.g. below
  let queryString = `SELECT reviews.*, COUNT(comments.review_id)::int AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id`;

  if (
    ![
      "created_at",
      "votes",
      "owner",
      "title",
      "review_id",
      "category",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  //queryParams.push(sort_by);
  queryString += ` ORDER BY ${sort_by} ${order}`;

  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};

//exports.postComment = (id, comment) => {};
