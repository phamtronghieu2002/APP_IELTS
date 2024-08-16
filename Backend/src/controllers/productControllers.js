const productService = require("~/services/productServices");
const handleRenderProductPage = async (req, res,next) => {
  try {
    const products = await productService.getAllProducts();
    return res.render("productPage.ejs", { products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleRenderProductPage,
};
