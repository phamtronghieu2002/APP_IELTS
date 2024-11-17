const { StatusCodes } = require('http-status-codes');
const questionServices = require('~/services/questionServices');
const ApiError = require('~/utils/ApiError');

const handleAddQuestion = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await questionServices?.addQuestion(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleGetQuestions = async (req, res, next) => {
    try {
        const result = await questionServices?.getAllQuestions();
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleupdateQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await questionServices?.updateQuestionById(id, data);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleDeleteQuestionById = async (req, res, next) => {
    try {

        const sub_question = req.body;
        console.log("sub_question >>>>>>", sub_question);
        
        const question_id = req.query?.q_id;
        const lesson_id = req.query?.lesson_id;
        const result = await questionServices?.deleteQuestion(question_id, sub_question, lesson_id);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleGetQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await questionServices?.getQuestionById(id);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}


module.exports = { handleAddQuestion, handleGetQuestions, handleupdateQuestionById, handleDeleteQuestionById, handleGetQuestionById }