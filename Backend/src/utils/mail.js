const nodemailer = require('nodemailer');


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phamhieuproaz@gmail.com',
    pass: 'dues bgeu fhlh iecc'  // Lưu ý: Không nên để mật khẩu ở đây trong mã nguồn công khai.
  }
});
