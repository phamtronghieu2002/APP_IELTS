const joi = require("joi");
const { checkValidation } = require("~/utils/validation");
const ApiError = require("~/utils/ApiError");
const { StatusCodes } = require("http-status-codes");
module.exports = {
    testResultValidation: async (req, res, next) => {
        try {
            const data = req.body;
            const validData = joi.object({
                test_id: joi.string().required(),
            });

            await checkValidation(validData, data);
            next();
        } catch (error) {
            return next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack));
        }
    },
    addAnwserToToTestResultValidation: async (req, res, next) => {
        try {

            const data = req.body;
            const validData = joi.object({
                anwser: joi.object({
                    question_id: joi.string().required(),
                    is_correct: joi.boolean().required(),
                }),

            });

            await checkValidation(validData, data);
            next();
        } catch (error) {
            return next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack));
        }
    }
};
