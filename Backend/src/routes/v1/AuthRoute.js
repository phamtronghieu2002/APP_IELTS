const express = require("express");
const Router = express.Router();
import { StatusCodes } from "http-status-codes";
import { veryfyUser } from "~/middlewares/authMiddleware";
const authValidation = require("../../validations/authValidation");
const authController = require("../../controllers/authController");
import { transporter } from "~/utils/mail";
Router.post("/register", authController?.handleRegister);
Router.post("/login", authController?.handleLogin);  
Router.get("/profile", veryfyUser, authController?.handleGetProfile);
Router.post("/sendMail",(req,res,next)=>{
     const content= req.body.content;
     var mailOptions = {
        from: 'IeltsApp@gmail.com',
        to: 'phamtronghieu2002iuh@gmail.com',
        subject: 'Phản hồi khách hàng về ứng dụng IeltsApp',
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            return res.status(StatusCodes.OK).json({
                message: "Send mail successfull",
                errcode: 0
            })
          console.log('Email sent: ' + info.response);
        }
      });
})
export default Router;