import express from "express";
const Router = express.Router();
import PrivacyAndTermsModel from "~/models/PrivacyAndTermsModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";


Router.post("/", async (req, res, next) => {
    const { contents, type } = req.body;
    try {
        const isExit = await PrivacyAndTermsModel.findOne({ type });
        // neeus tồn tại thì update
        if (isExit) {
            const result = await PrivacyAndTermsModel.findOneAndUpdate({ type }, { contents }, { new: true });
            return res.status(StatusCodes.OK).json(result);
        }
        // nếu không tồn tại thì tạo mới
        const newPrivacyAndTerms = new PrivacyAndTermsModel({ contents, type });
        const result = await newPrivacyAndTerms.save();



        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});

Router.get("/", async (req, res, next) => {
    try {
        const result = await PrivacyAndTermsModel.find();
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Get Privacy and Terms successfully",
            errCode: 0,
        });
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});

export default Router;