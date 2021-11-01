const db = require("../connection");
const {
  formatCategoryData,
  formatUsersData,
  formatReviewsData,
} = require("../../utils/utils");
const format = require("pg-format");
const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  // 1. Drop all tables in specific order if they exist
  return db
    .query(
      `
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS categories;
  `
    )
    .then(() => {
      // 2. Create tables
      return db.query(`CREATE TABLE categories 
    (slug VARCHAR PRIMARY KEY,
      description VARCHAR NOT NULL);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users
      (username VARCHAR PRIMARY KEY,
        avatar_url VARCHAR,
        name VARCHAR NOT NULL);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        review_body VARCHAR NOT NULL,
        designer VARCHAR NOT NULL,
        review_img_url VARCHAR,
        votes INT NOT NULL DEFAULT 0,
        category VARCHAR REFERENCES categories(slug) NOT NULL,
        owner VARCHAR REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP NOT NULL,
        body VARCHAR NOT NULL
      );`);
    })
    .then(() => {
      // 3. Insert data
      const formattedCategoryData = formatCategoryData(categoryData);
      const sqlCategoriesQuery = format(
        `INSERT INTO categories (slug, description) VALUES %L;`,
        formattedCategoryData
      );
      return db.query(sqlCategoriesQuery);
    })
    .then(() => {
      const formattedUsersData = formatUsersData(userData);
      const sqlUsersQuery = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formattedUsersData
      );
      return db.query(sqlUsersQuery);
    })
    .then(() => {
      const formattedReviewsData = formatReviewsData(reviewData);
      const sqlReviewsQuery = format(
        `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at,votes) VALUES %L;`,
        formattedReviewsData
      );
      return db.query(sqlReviewsQuery);
    })
    .then(() => {});
  // .then(() => {
  //   return db.query(`SELECT * FROM reviews;`);
  // })
  // .then(({ rows }) => {
  //   console.log(rows);
  // });
};

module.exports = seed;
