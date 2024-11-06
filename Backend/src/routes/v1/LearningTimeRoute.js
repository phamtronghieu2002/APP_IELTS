const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { veryfyUser } from "~/middlewares/authMiddleware";
import LearningTimeModels from "~/models/LearningTimeModels";


// thêm 1 learning time
Router.post('/', veryfyUser, async (req, res) => {
    const user_id = req.user_id;
    const { minutes } = req.body;
    const currentDate = new Date().toISOString().split('T')[0]; // Ngày hiện tại (YYYY-MM-DD)

    try {
        // Tìm bản ghi thời gian học của người dùng trong ngày
        const record = await LearningTimeModels.findOne({ user_id, date: currentDate });

        if (record) {
            // Cập nhật số phút nếu đã có bản ghi
            record.minutes += minutes;
            await record.save();
        } else {
            // Tạo bản ghi mới nếu chưa có
            await LearningTimeModels.create({
                user_id,
                date: currentDate,
                minutes,
            });
        }

        res.status(200).json({ message: 'Thời gian học đã được cập nhật.' });
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi khi lưu thời gian học.' });
    }
});


Router.get('/getByTime',veryfyUser, async (req, res) => {
    const user_id = req.user_id;
    // Lấy ngày hiện tại và ngày của 7 ngày trước
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // 7 ngày bao gồm hôm nay và 6 ngày trước

    try {
        // Lọc các bản ghi trong khoảng thời gian từ 7 ngày trước đến ngày hiện tại
        const data = await LearningTimeModels.find({
            user_id,
            date: { $gte: sevenDaysAgo.toISOString().split('T')[0], $lte: today.toISOString().split('T')[0] },
        }).sort({ date: 1 }); // Sắp xếp theo ngày tăng dần

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi khi lấy dữ liệu thống kê.' });
    }
});








export default Router;