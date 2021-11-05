const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controller.js");
const { invalidMethod } = require("../utils/utils");

categoriesRouter.route("/").get(getCategories).all(invalidMethod);

module.exports = { categoriesRouter };
