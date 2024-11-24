const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname);
    },
});

// Giới hạn kích thước file (50MB)
const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}); // Nếu bạn muốn upload một file tại một thời điểm, ví dụ như 'file' là tên trường file trong form

module.exports = uploadFile;
