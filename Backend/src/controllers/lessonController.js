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
        const user_id = req.query.user_id || "";

        const keyword = req.query.keyword || "";
        const result = await lessonServices?.getLessonsByCateId(categoryid,keyword,user_id);
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

const handleDeleteLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await lessonServices?.deleteLesson(id);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleUpdateLesson = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await lessonServices?.updateLesson(id, data);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const  handleGetLessonById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await lessonServices?.getLessonById(id);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

module.exports = { handleAddLesson,handleGetLessons ,handleAddTest,handleDeleteLesson,handleUpdateLesson,handleGetLessonById}