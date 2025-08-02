import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authSeller = (req, res, next) => {
    const {sellerToken} = req.cookies;
    if (!sellerToken) {
        return res.json({
            success: false,
            message: "Not Authorized"
        });
    }
    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(tokenDecode.email === process.env.SELLER_EMAIL) {
            next(); // Proceed to the next middleware or controller
        }
        else{
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export default authSeller;