const usersRouter = require("express").Router();
const { getAllUsers, getUser } = require("../controllers/users.controller");

usersRouter.route("/").get(getAllUsers);

usersRouter.route("/:username").get(getUser);

module.exports = { usersRouter };
