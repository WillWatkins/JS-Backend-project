const usersRouter = require("express").Router();
const { getAllUsers, getUser } = require("../controllers/users.controller");
const { invalidMethod } = require("../utils/utils");

usersRouter.route("/").get(getAllUsers).all(invalidMethod);

usersRouter.route("/:username").get(getUser).all(invalidMethod);

module.exports = { usersRouter };
