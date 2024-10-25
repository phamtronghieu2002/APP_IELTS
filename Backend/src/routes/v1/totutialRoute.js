import express from "express";
const Router = express.Router();
import ToturalModal from "~/models/ToturialModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

Router.get("/", async (req, res, next) => {
    try {
        const cate_id = req.query.cate_id;
        const result = await ToturalModal.findOne({
            cate_id
        });
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Get all toturial success !!!",
            errCode: 0
        });
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});
Router.post("/", async (req, res, next) => {
    const { contents, cate_id } = req.body;

    try {
        const isExit = await ToturalModal.findOne({ cate_id });
        // neeus tồn tại thì push vào mảng contents
        if (isExit) {
            const result = await ToturalModal
                .findOneAndUpdate({ cate_id }, { contents }, { new: true });
            return res.status(StatusCodes.OK).json({
                data: result,
                message: "Create new toturials success !!!",
                errCode: 0

            });
        }
        // nếu không tồn tại thì tạo mới
        const newToturial = new ToturalModal({
            contents, cate_id
        });
        const result = await  newToturial.save();



        return res.status(StatusCodes.CREATED).json({
            data: result,
            message: "Create new toturial success",
            errCode: 0

        });
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});


export default Router;