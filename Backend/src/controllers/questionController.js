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
const handleUpdateQuestionByTestId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await questionServices?.updateQuestionByTestId(id, data);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleDeleteQuestionById = async (req, res, next) => {
    try {
        const  questionid  = req.query?.questionid;
        const  testid  = req.params.id
        const result = await questionServices?.deleteQuestion(testid,questionid);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}


module.exports = { handleAddQuestion ,handleGetQuestions,handleUpdateQuestionByTestId,handleDeleteQuestionById}