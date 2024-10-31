const authServices = require("~/services/authServices");
const ApiError = require("~/utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const handleRegister = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await authServices?.register(data);
    return res.status(StatusCodes?.CREATED).json(result);
  } catch (error) {

    const newError = new ApiError(500, error.message, error.stack);
    next(newError);
  }
};

const handleGetProfile= async (req, res, next) => {
  try {
    const userid = req.userid;
    const result = await authServices.getProfile(userid);
    return res.status(StatusCodes?.CREATED).json(result);
  } catch (error) {

    const newError = new ApiError(500, error.message, error.stack);
    next(newError);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await authServices?.login(data);
    return res.status(StatusCodes?.CREATED).json(result);
  } catch (error) {
    const newError = new ApiError(500, error.message, error.stack);
    next(newError);
  }
}

module.exports = {
  handleRegister,
  handleGetProfile,
  handleLogin
};
