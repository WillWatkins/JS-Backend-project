const db = require("../db/connection");

exports.selectAllUsers = () => {
  let queryString = `SELECT * FROM users`;
  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};

exports.selectUser = (username) => {
  let queryString = `
    SELECT * FROM users 
    WHERE username =$1`;

  return db.query(queryString, [username]).then(({ rows }) => {
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "Not found" });
    }
    return rows;
  });
};
