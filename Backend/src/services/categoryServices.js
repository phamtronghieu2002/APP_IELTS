import CategoryModel from '../models/CategoriesModel.js';
import * as  lessonServices from './lessonServices.js';
const addCategory = async (category) => {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
};
const getCategories = async (group, user_id) => {
    let data = [];
    if (group === 'all') {
        data = await CategoryModel.find();
    } else {
        data = await CategoryModel.find({ group: group });
    }

    // Sử dụng chỉ mục để cập nhật `data`
    for (let i = 0; i < data.length; i++) {
        // Chuyển `item` thành một đối tượng thuần để có thể gán thuộc tính mới
        let item = data[i].toObject();

        const lesson = await lessonServices.getLessonsByCateId(item._id.toString(), "", user_id);
        let total_correct = 0;
        const fb = lesson.data;

        fb.forEach((lessonItem) => {
            total_correct += lessonItem.total_correct || 0; // Đảm bảo giá trị mặc định là 0 nếu total_correct không tồn tại
        });

        console.log("total_correct >", total_correct);
        item.total_correct = total_correct;

        console.log("item >>>>>", item);

        // Cập nhật lại đối tượng đã thay đổi vào `data`
        data[i] = item;
    }

    return {
        data,
        message: "Get Categories successfully",
        errCode: 0
    };
};

module.exports = {
    addCategory,
    getCategories
}