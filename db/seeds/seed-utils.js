const db = require("../connection");
const {
  formatCategoryData,
  formatUsersData,
  formatReviewsData,
  formatCommentsData,
} = require("../../utils/utils");

const format = require("pg-format");

exports.dropTables = () => {
  return db.query(`
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS categories;
  `);
};

exports.createCategoriesTable = () => {
  return db.query(`CREATE TABLE categories 
    (slug VARCHAR PRIMARY KEY,
      description VARCHAR NOT NULL);`);
};

exports.insertIntoCategoriesTable = (categoryData) => {
  const formattedCategoryData = formatCategoryData(categoryData);
  const sqlCategoriesQuery = format(
    `INSERT INTO categories (slug, description) VALUES %L;`,
    formattedCategoryData
  );
  return db.query(sqlCategoriesQuery);
};

exports.createUsersTable = () => {
  return db.query(`CREATE TABLE users
    (username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR,
      name VARCHAR NOT NULL);`);
};

exports.insertIntoUsersTable = (userData) => {
  const formattedUsersData = formatUsersData(userData);
  const sqlUsersQuery = format(
    `INSERT INTO users (username, name, avatar_url) VALUES %L`,
    formattedUsersData
  );
  return db.query(sqlUsersQuery);
};

exports.createReviewsTable = () => {
  return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        review_body VARCHAR NOT NULL,
        designer VARCHAR NOT NULL,
        review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT NOT NULL DEFAULT 0,
        category VARCHAR REFERENCES categories(slug) NOT NULL,
        owner VARCHAR REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
};

exports.insertIntoReviewsTable = (reviewData) => {
  const formattedReviewsData = formatReviewsData(reviewData);
  const sqlReviewsQuery = format(
    `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at,votes) VALUES %L;`,
    formattedReviewsData
  );
  return db.query(sqlReviewsQuery);
};

exports.createCommentsTable = () => {
  return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body VARCHAR NOT NULL
      );`);
};

exports.insertIntoCommentsTable = (commentData) => {
  const formattedCommentsData = formatCommentsData(commentData);
  const sqlCommentsQuery = format(
    `INSERT INTO comments (body, votes, author, review_id,created_at) VALUES %L;`,
    formattedCommentsData
  );
  return db.query(sqlCommentsQuery);
};
