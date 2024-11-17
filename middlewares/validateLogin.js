import { verifyToken } from "../utils/token.js";


export const validateLogin = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) throw new Error("No está logueado");
        
        const {data} = verifyToken(token);
        req.user = data;

        next();
    } catch (error) {
        res.status(400).send({success: false, message: error.message});
    }
};