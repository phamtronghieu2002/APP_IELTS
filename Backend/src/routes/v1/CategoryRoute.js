const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { veryfyUser } from "~/middlewares/authMiddleware";
const categoryController = require("../../controllers/categoryController");
const { categoryValidation } = require("../../validations/categoryValidation");


http://192.168.85.187:8080/api/v1/category
Router.post("/", categoryValidation, categoryController?.handleAddCategory);



Router.get("/admin", categoryController?.handleGetCategoriesByGroup);
Router.get("/",veryfyUser, categoryController?.handleGetCategoriesByGroup);

export default Router;