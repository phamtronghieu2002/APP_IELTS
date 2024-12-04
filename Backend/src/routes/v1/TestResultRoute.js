import { veryfyUser } from "~/middlewares/authMiddleware";

const express = require("express");
const Router = express.Router();

const testResultController = require("../../controllers/testResultController");
const { testResultValidation, addAnwserToToTestResultValidation } = require("../../validations/testResultValidation");



Router.post("/", [veryfyUser, testResultValidation], testResultController?.handleAddTestResult);
Router.post("/addAnwser",veryfyUser, addAnwserToToTestResultValidation, testResultController?.handleAddQuestion);
Router.post("/bookmark",veryfyUser, testResultController?.handleBookmarkTestResult);
Router.get("/", veryfyUser, testResultController?.handleGetTestResult);
Router.get("/all", veryfyUser, testResultController?.handleGetAllTestResult);
Router.delete("/",veryfyUser, testResultController?.handleDeleteTestResult);




export default Router;
