const productService = require("~/services/productServices");
const ApiError = require("~/utils/ApiError");

const handleRenderProductPage = async (req, res,next) => {
  try {
 
  

  } catch (error) {
    next(new ApiError(500, error.message, error.stack));
  }
};

module.exports = {
  handleRenderProductPage,
};
