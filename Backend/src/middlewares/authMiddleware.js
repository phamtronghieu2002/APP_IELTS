

import env from "~/config/env";
import jwt from "jsonwebtoken";
const { StatusCodes } = require("http-status-codes");
export const veryfyUser = async (req, res, next) => {
    const accessToken = req.headers["authorization"].split(" ")[1];


    
    if (accessToken) {
        try {
            const decoded_token = jwt.verify(
                accessToken,
                env?.JWT_ACCESS_TOKEN_SECRET
            );

            console.log("decoded_token:>>", decoded_token);
            req.userid = decoded_token?.userid;
            next();
        } catch (error) {
            return res.status(StatusCodes?.UNAUTHORIZED).json({ message: "token invalid" });
        }
    } else {
        return res.status(StatusCodes?.UNAUTHORIZED).json({ message: "token invalid" });
    }
};