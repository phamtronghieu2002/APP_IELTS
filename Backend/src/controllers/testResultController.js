
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



export const handleGetTestResult = async (req, res, next) => {
    try {
        const test_id = req.query.test_id;
        const user_id = req.user_id;

        const result = await testServices?.getTestResult(test_id,
            user_id);

        
             
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

export const handleDeleteTestResult = async (req, res, next) => {
    try {
        const test_id = req.query.test_id;
        const question_id = req.query?.question_id;

        const result = await testServices?.deleteTestResult(test_id,
            question_id);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

// export const handleAddTextResult = async (req, res, next) => {
//     try {
//         const { test_id, type } = req.query;
//         const data = req.body?.anwser;
//         const result = await testServices?.addQuestion(test_id, type, data);
//         return res.status(StatusCodes.CREATED).json(result);

//     } catch (error) {
//         next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
//     }
// }
