import { veryfyUser } from "~/middlewares/authMiddleware";

const express = require("express");
const Router = express.Router();

const testResultController = require("../../controllers/testResultController");
const { testResultValidation, addAnwserToToTestResultValidation } = require("../../validations/testResultValidation");



Router.post("/", [veryfyUser, testResultValidation], testResultController?.handleAddTestResult);
Router.post("/addAnwser", addAnwserToToTestResultValidation, testResultController?.handleAddQuestion);





export default Router;