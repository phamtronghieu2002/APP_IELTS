
/* eslint-disable no-unused-vars */


// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
const errorHandlingMiddleware = (err, req, res, next) => {
   
  console.log('====================================');
  console.log("lot vao mid error");
  console.log('====================================');
  return res.status(err.statusCode || 500).json({
    status: "error",
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });

}
module.exports = errorHandlingMiddleware