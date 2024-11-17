const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import UsersModel from "~/models/UsersModel";
import LessonModel from "~/models/LessonModel";
import CategoriesModel from "~/models/CategoriesModel";

//age, email, password


Router.get("/", async (req, res, next) => {
    //   get tổng số user
    const users = await UsersModel.find();
    //    get tổng số user theo từng tháng  theo năm  data trả về dạng
    // { "month": "2024-01", "userCount": 120 },
    //   { "month": "2024-02", "userCount": 150 },
    //   { "month": "2024-03", "userCount": 170 },

    const usersMonth = await UsersModel.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$createdAt",
                    },
                },
                userCount: { $sum: 1 },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);
        //    get tổng số user theo tháng hiện tại
    const usersCurrentMonth = await UsersModel.find({
        createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
    });









    // get tổng số category
    const category = await CategoriesModel.find();
    const lesson = await LessonModel.find();
    // lặp các category để lấy số lesson theo từng category

    let lessonByCategory = [];

    for (let i = 0; i < category.length; i++) {
        let lessonCount = await LessonModel.find({
            cate_id
                : category[i]._id
        });
        lessonByCategory.push({ category: category[i].name_category, lessonCount: lessonCount.length });
    }
    return res.status(StatusCodes.OK).json({ users: users.length, usersMonth, usersCurrentMonth:usersCurrentMonth?.length, category: category.length, lesson: lesson.length, lessonByCategory });

});



export default Router;