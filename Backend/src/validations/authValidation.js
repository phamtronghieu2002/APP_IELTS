const joi = require("joi");
const { checkValidation } = require("~/utils/validation");
const ApiError = require("~/utils/ApiError");
const { StatusCodes } = require("http-status-codes");
module.exports = {
  userValidation: async (req, res, next) => {
    try {
   
      const data = req.body;
      const validData = joi.object({

        email: joi.string(),
        phonenumber: joi.string(),
        displayname: joi.string(),
        avatarPicture: joi.string(),

      });

      // await checkValidation(validData, data);
      next();
    } catch (error) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, error.message, error.stack));
    }
  },
};
