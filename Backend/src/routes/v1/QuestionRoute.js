const express = require("express");
const Router = express.Router();

const questionController = require("../../controllers/questionController");
const { questionValidation } = require("../../validations/questionValidation");



Router.post("/", questionValidation, questionController?.handleAddQuestion);
Router.get("/", questionController?.handleGetQuestions);
Router.put("/test/:id", questionController?.handleUpdateQuestionByTestId);
Router.delete("/test/:id", questionController?.handleDeleteQuestionById);




export default Router;