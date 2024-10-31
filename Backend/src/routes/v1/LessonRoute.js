const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { veryfyUser } from "~/middlewares/authMiddleware";
const lessonController = require("../../controllers/lessonController");
const { lessonValidation } = require("../../validations/lessonValidation");


Router.post("/", lessonValidation, lessonController?.handleAddLesson);
Router.post("/addTest/:id", lessonController?.handleAddTest);
Router.get("/category/:id", lessonController?.handleGetLessons);
Router.get("/:id", lessonController?.handleGetLessonById);
Router.delete("/:id", lessonController?.handleDeleteLesson);
Router.put("/:id", lessonController?.handleUpdateLesson);




export default Router;