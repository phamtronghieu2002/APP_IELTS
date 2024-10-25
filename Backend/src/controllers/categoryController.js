const { StatusCodes } = require('http-status-codes');
const categoryServices = require('~/services/categoryServices');
const ApiError = require('~/utils/ApiError');

const handleAddCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await categoryServices?.addCategory(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleGetCategoriesByGroup = async (req, res, next) => {
    try {
        const group = req.query.group || "";
        const result = await categoryServices?.getCategories(group);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

module.exports = { handleAddCategory,handleGetCategoriesByGroup }