const joi = require("joi");
const { checkValidation } = require("~/utils/validation");
const ApiError = require("~/utils/ApiError");
const {StatusCodes} = require("http-status-codes");
module.exports = {
  userValidation: async (req, res, next) => {

    try {

      const data = req.body;
  
      const validData = joi.object({
        age: joi.number().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
   
      // await checkValidation(validData, data);
      next();
    } catch (error) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack));
    }
  },
};
