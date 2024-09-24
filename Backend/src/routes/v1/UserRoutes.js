const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { userValidation } from "~/validations/userValidation";

//age, email, password


Router.post("/",userValidation, (req, res, next) => {

    return res.status(StatusCodes.OK).json({ message: "Welcome to the User API" });
});

export default Router;