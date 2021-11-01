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

// exports.selectArticles = (id) => {
//   const queryStr = `
//         SELECT
//             articles.*,
//             COUNT(c.author) AS comment_count
//         FROM articles
//         LEFT OUTER JOIN comments AS c ON articles.article_id = c.article_id
//         WHERE articles.article_id = $1 GROUP BY articles.article_id
//     `;

//   return db.query(queryStr, [id]).then(({ rows }) => rows[0]);
// };

//SELECT animals.*, COUNT(northcoder_id) AS number_of_fans
// FROM animals
// LEFT JOIN northcoders ON northcoders.favourite_animal_id = animals.animal_id
// GROUP BY animal_id;
