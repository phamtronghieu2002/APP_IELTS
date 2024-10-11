import CategoryModel from '../models/CategoriesModel.js';

const addCategory = async (category) => {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
};
const getCategories = async (group) => {
    let data = []
    if (group === 'all') {
        data = await CategoryModel
            .find();
    } else {

        data = await CategoryModel.find
            ({
                group: group
            });
    }
    return {
        data,
        message: "Get Categories successfully",
        errCode: 0
    }
}

module.exports = {
    addCategory,
    getCategories
}