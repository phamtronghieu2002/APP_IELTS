const { StatusCodes } = require('http-status-codes');
const lessonServices = require('~/services/lessonServices');
const ApiError = require('~/utils/ApiError');

const handleAddLesson = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await lessonServices?.addlesson(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleGetLessons = async (req, res, next) => {
    try {

        const categoryid = req.params.id || "";

        const result = await lessonServices?.getLessonsByCateId(categoryid);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleAddTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await lessonServices?.addTest(id, data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}


module.exports = { handleAddLesson,handleGetLessons ,handleAddTest}