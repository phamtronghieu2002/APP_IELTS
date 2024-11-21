const { StatusCodes } = require('http-status-codes');
const testServices = require('~/services/testService');
const ApiError = require('~/utils/ApiError');

const handleAddTest = async (req, res, next) => {
    try {
        const data = req.body;
        console.log("data >>", data);
        

        const result = await testServices?.addtest(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleAddQuestionTest = async (req, res, next) => {
    try {
        const data = req.body;
        data.id = req.params.id;


        const result = await testServices?.addQuestionTest(data);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleDeleteQuestionTest = async (req, res, next) => {

    try {
    
       const questionId = req.params.id;
       const testId = req.params.test_id;
       const data ={
              questionId,
              testId
       }

        const result = await testServices?.deleteQuestionTest(data);
        return res.status(StatusCodes.OK).json(result);
    }

    catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleDeleteTest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const type_category = req.body.type_category;
        const result = await testServices?.deleteTest(id,type_category);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleUpdateTest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log("data >>", data);

        const result = await testServices?.updateTest(id, data);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
const handleGetAllTest = async (req, res, next) => {
    try {
        const result = await testServices?.getAllTest();
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}

const handleGetTestById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await testServices?.getTestById(id);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}



module.exports = {
    handleAddTest,
    handleDeleteTest,
    handleUpdateTest,
    handleAddQuestionTest,
    handleDeleteQuestionTest,
    handleGetAllTest,
    handleGetTestById,

}