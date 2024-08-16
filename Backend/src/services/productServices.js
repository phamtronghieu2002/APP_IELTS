const getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    try {
      // xử lí logic ở đây
      throw new Error("getAllProducts not implemente");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllProducts,
};
