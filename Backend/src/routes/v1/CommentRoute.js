import express from "express";
import { veryfyUser } from "~/middlewares/authMiddleware";
import CommentModels from "~/models/CommentModels";
import ApiError from "~/utils/ApiError";
const Router = express.Router();

Router.post("/", veryfyUser, async (req, res, next) => {

    const {
        test_id,
        content,
    } = req.body;
    const user_id = req.user_id;
    const comment = new CommentModels({
        user_id,
        test_id,
        content,
    });
    try {
        await comment.save();
        return res.status(200).json({
            data: comment,
            message: "Comment created successfull",
            errcode: 0
        })
    } catch (error) {
        next(new ApiError(error.message, 500));
    }
});

Router.post("/reply", veryfyUser, async (req, res, next) => {

    const {

        test_id,
        parent_id,
        content,
    } = req.body;
    const user_id = req.user_id;
    const comment = new CommentModels({
        user_id,
        test_id,
        content,
        is_root: false,
    });
    console.log('====================================');
    console.log(
        "parent_id: ", parent_id
    );
    console.log('====================================');
    const result = await comment.save();
    try {
        const parentComment = await CommentModels
            .findByIdAndUpdate(
                { _id: parent_id },
                { $push: { replies: result._id } },
                { new: true }
            )

        return res.status(200).json({
            data: comment,
            message: "Comment created successfull",
            errcode: 0
        })

    } catch (error) {
        next(new ApiError(error.message, 500));
    }
});

async function populateReplies(comment) {
    // Populate cả replies và user_id cùng một lúc
    await comment.populate({
        path: 'replies',
        populate: { path: 'user_id' } // Populate user_id trong mỗi reply
    });

    // Populate user_id của comment gốc nếu cần
    await comment.populate('user_id');

    // Gọi đệ quy để populate tất cả replies con
    for (let reply of comment.replies) {
        await populateReplies(reply);
    }

    return comment;
}

// Route lấy tất cả comment của test với toàn bộ các tầng replies
Router.get("/test/:id", async (req, res, next) => {
    try {
        const test_id = req.params.id;

        // Tìm các comment gốc cho bài test
        let comments = await CommentModels.find({ test_id, is_root: true });

        // Đệ quy populate replies cho từng comment gốc
        comments = await Promise.all(comments.map(comment => populateReplies(comment)));

        return res.status(200).json({
            data: comments,
            message: "Get all comments successfully",
            errcode: 0
        });
    } catch (error) {
        next(new ApiError(error.message, 500));
    }
});

Router.post("/like", veryfyUser, async (req, res, next) => {
    const { comment_id } = req.body;
    const user_id = req.user_id;
    try {
        //kiểm tra  nếu trong mảng like chưa có user_id thì thêm vào,còn user_id rồi thì xóa đi
        const comment = await CommentModels.findById(comment_id);
        let fb = {}
        if (comment.likes.includes(user_id)) {
            fb = await
                CommentModels.findByIdAndUpdate(
                    { _id: comment_id },
                    { $pull: { likes: user_id } },
                    { new: true }
                );
        }
        else {
            fb = await
                CommentModels.findByIdAndUpdate(
                    { _id: comment_id },
                    { $push: { likes: user_id } },
                    { new: true }
                );
        }
        return res.status(200).json({
            data: fb,
            message: "Like comment successfull",
            errcode: 0
        });



    } catch (error) {
        next(new ApiError(error.message, 500));
    }
}
);

export default Router;
