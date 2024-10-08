
const { StatusCodes } = require('http-status-codes');
const testServices = require('~/services/testResultServices');
const ApiError = require('~/utils/ApiError');


export const handleAddTestResult = async (req, res, next) => {
    try {
        const data = req.body;
        data.user_id = req.user_id;

        const result = await testServices?.addTestResult(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}


export const handleAddQuestion = async (req, res, next) => {
    try {
        const { test_id, type } = req.query;
        const data = req.body?.anwser;
        const result = await testServices?.addQuestion(test_id, type, data);
        return res.status(StatusCodes.CREATED).json(result);

    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

