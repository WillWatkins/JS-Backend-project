const { off } = require("superagent");
const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

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

exports.selectReviews = (
  sort_by = "created_at",
  order = "ASC",
  category,
  limit = 10,
  page = 1
) => {
  const queryParams = [];
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
  if (!["asc", "ASC", "desc", "DESC"].includes(order)) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  queryParams.push(limit);
  const offset = limit * (page - 1);
  queryParams.push(offset);

  //Cast a function output with :: e.g. below
  let queryString = `SELECT reviews.*, COUNT(comments.review_id)::int AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    queryParams.push(category);
    queryString += ` WHERE category=$3`;
  }
  queryString += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order} LIMIT $1 OFFSET $2`;

  return db.query(queryString, queryParams).then(({ rows }) => {
    if (rows.length < 1) {
      return checkExists("categories", "slug", category);
    }
    return rows;
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

  const queryString = `
      INSERT INTO comments (body, author, review_id)
      VALUES ($1 ,$2, $3) 
      RETURNING*;`;

  return db.query(queryString, [body, author, id]).then(({ rows }) => {
    return rows;
  });
};
