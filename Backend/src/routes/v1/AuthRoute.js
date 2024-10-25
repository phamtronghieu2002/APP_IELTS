const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { veryfyUser } from "~/middlewares/authMiddleware";
const authValidation = require("../../validations/authValidation");
const authController = require("../../controllers/authController");

Router.post("/register", authController?.handleRegister);
// Router.post("/login", authController?.handleLogin);  
Router.get("/profile", veryfyUser, authController?.handleGetProfile);

export default Router;