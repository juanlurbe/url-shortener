import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

export const genToken = (data) => {
    const token = jwt.sign({data}, JWT_SECRET, {expiresIn:"1d"});
    return token;
};

export const verifyToken = (token) => {
    const verify = jwt.verify(token, JWT_SECRET);
    return verify;
};
