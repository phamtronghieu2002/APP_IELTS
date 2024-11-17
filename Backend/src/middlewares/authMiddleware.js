

const env = require("~/config/env");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
export const veryfyUser = async (req, res, next) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1];    
    if (accessToken) {
        try {
            const decoded_token = jwt.verify(
                accessToken,
                env?.JWT_ACCESS_TOKEN_SECRET
            );

           
            req.user_id = decoded_token?.userid;
            next();
        } catch (error) {
            return res.status(StatusCodes?.UNAUTHORIZED).json({ message: "token invalid" });
        }
    } else {
        return res.status(StatusCodes?.UNAUTHORIZED).json({ message: "token invalid" });
    }
};