const db = require("../db/connection");

exports.selectCategories = () => {
  console.log("IN MODEL");
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
};
