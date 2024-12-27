const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import UsersModel from "~/models/UsersModel";
import LessonModel from "~/models/LessonModel";
import CategoriesModel from "~/models/CategoriesModel";
import ApiError from "../../../build/src/utils/ApiError";

//age, email, password


Router.get("/", async (req, res, next) => {
    //   get tổng số user
     
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "error"));

});



export default Router;