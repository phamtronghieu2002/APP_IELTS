const express = require("express");
const Router = express.Router();

const testController = require("../../controllers/testController");
const { testValidation, testAddQuestionValidation } = require("../../validations/testValidation");


Router.post("/", testValidation, testController?.handleAddTest);
Router.post("/addQuestion/:id", testAddQuestionValidation, testController?.handleAddQuestionTest);
Router.delete("/:test_id/deleteQuestion/:id", testController?.handleDeleteQuestionTest);
Router.delete("/:id", testController?.handleDeleteTest);
Router.get("/", testController?.handleGetAllTest);
Router.get("/:id", testController?.handleGetTestById);
Router.put("/:id", testController?.handleUpdateTest);


export default Router;