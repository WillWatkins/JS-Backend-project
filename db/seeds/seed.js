const {
  dropTables,
  createCategoriesTable,
  createUsersTable,
  createReviewsTable,
  createCommentsTable,
  insertIntoCategoriesTable,
  insertIntoUsersTable,
  insertIntoReviewsTable,
  insertIntoCommentsTable,
} = require("./seed-utils");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  // 1. Drop all tables in specific order if they exist
  return dropTables()
    .then(() => {
      // 2. Create tables
      return createCategoriesTable();
    })
    .then(() => {
      return createUsersTable();
    })
    .then(() => {
      return createReviewsTable();
    })
    .then(() => {
      return createCommentsTable();
    })
    .then(() => {
      // 3. Insert data
      return insertIntoCategoriesTable(categoryData);
    })
    .then(() => {
      return insertIntoUsersTable(userData);
    })
    .then(() => {
      return insertIntoReviewsTable(reviewData);
    })
    .then(() => {
      return insertIntoCommentsTable(commentData);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { seed };
