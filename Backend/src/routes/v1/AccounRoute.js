import express from 'express';
import AccountModel from '~/models/AccountModel';
import ApiError from '~/utils/ApiError';
import { create_access_token } from '~/utils/jwt';
const Router = express.Router();


Router.post("/createAdmin", (req, res, next) => {
    try {
        const data = req.body;
        console.log('====================================');
        console.log("data >>>", data);
        console.log('====================================');
        const account = new AccountModel(data);
        account.save();
        return res.status(200).json({
            data: account,
            message: "Create account successfully",
            errorCode: 0
        });

    } catch (error) {
        next(new ApiError(500, error.message, error.stack)); 
    }
})

Router.post("/login",async (req, res, next) => {
    try {
        const {username,password} = req.body;

        const account =await AccountModel
        .findOne({username,password})
        .exec();
       
        const acountO = account.toObject();
        const accessToken = create_access_token({userID: acountO._id}, "30d");
        console.log("account >>>", account);
        
        acountO.accessToken = accessToken;
        if(!account){
            return res.status(400).json({
                message: "Account not found",
                errorCode: 1
            });
        }


        return res.status(200).json({
            data: acountO,
            message: "Login successfully",
            errorCode: 0
        });


     
  
    } catch (error) {
        next(new ApiError(500, error.message, error.stack));
    }
})
export default Router;
