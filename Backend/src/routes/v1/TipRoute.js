import express from "express";
const Router = express.Router();
import TipModal from "~/models/TipsModels";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

Router.get("/", async (req, res, next) => {
    try {
        const cate_id = req.query.cate_id;
        const result = await TipModal.findOne({
            cate_id
        });
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Get all tip success",
            errCode: 0
        });
    } catch (error) {

        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});
Router.post("/", async (req, res, next) => {
    const { contents, cate_id } = req.body;
    // mảng contents  có dạng như sau{
    //     name_tip:1212
    //     id_tip:"123"
    //     content:"content"
    // }
    try {
        const isExit = await TipModal.findOne({ cate_id });
        // neeus tồn tại thì push vào mảng contents
        if (isExit) {
            const result = await TipModal
                .findOneAndUpdate({ cate_id }, { $push: { contents } }, { new: true });
            return res.status(StatusCodes.OK).json({
                data: result,
                message: "Create new tip success",
                errCode: 0

            });
        }
        // nếu không tồn tại thì tạo mới
        const newTip = new TipModal({
            contents: [
                {
                    ...contents,
                    content: ""
                }
            ], cate_id
        });
        const result = await newTip.save();



        return res.status(StatusCodes.CREATED).json({
            data: result,
            message: "Create new tip success",
            errCode: 0

        });
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});

Router.delete("/:id", async (req, res, next) => {
    try {
        const id_tip = req.params.id;

        // mảng content  có dạng như sau{
        //     name_tip:1212
        //     id_tip:"123"
        //     content:"content"
        // }
        //   xóa phần tử trong mảng contents với điều kiện  id_tip
        const result = await TipModal.findOneAndUpdate(
            { "contents.id_tip": id_tip },
            { $pull: { contents: { id_tip } } },
            { new: true } // Tùy chọn để trả về document đã cập nhật
        )
        return res.status(StatusCodes.OK).json({
            data: result,
            message: "Delete tip success",
            errCode: 0
        }
        );




    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});
Router.put("/", async (req, res, next) => {


    try {
        // mảng content  có dạng như sau{
        //     name_tip:1212
        //     id_tip:"123"
        //     content:"content"
        // }
        const { contents, cate_id } = req.body;

        //   cập nhật phần tử trong mảng contents với điều kiện id_tip
        const result = await TipModal.findOneAndUpdate(
            { cate_id, "contents.id_tip": contents?.id_tip },
            { $set: { "contents.$": contents } },

            { new: true } // Tùy chọn để trả về document đã cập nhật
        )


        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
});

export default Router;