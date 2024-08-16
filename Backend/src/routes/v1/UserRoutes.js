const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
Router.get("/", (req, res,next) => {
    res.status(StatusCodes.CREATED).json({ message: "Hello Trong Hieu" });
});

export default Router;