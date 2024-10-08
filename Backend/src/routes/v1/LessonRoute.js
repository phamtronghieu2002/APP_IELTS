const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
const lessonController = require("../../controllers/lessonController");
const { lessonValidation } = require("../../validations/lessonValidation");


http://192.168.85.187:8080/api/v1/category
Router.post("/", lessonValidation, lessonController?.handleAddLesson);
Router.post("/addTest/:id", lessonController?.handleAddTest);

Router.get("/category/:id", lessonController?.handleGetLessons);




export default Router;