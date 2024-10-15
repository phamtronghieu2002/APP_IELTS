const express = require("express");
const Router = express.Router();

const questionController = require("../../controllers/questionController");
const { questionValidation } = require("../../validations/questionValidation");



Router.post("/", questionValidation, questionController?.handleAddQuestion);
Router.get("/", questionController?.handleGetQuestions);
Router.get("/:id", questionController?.handleGetQuestionById);

Router.put("/:id", questionController?.handleupdateQuestionById);
Router.delete("/test/:id", questionController?.handleDeleteQuestionById);




export default Router;