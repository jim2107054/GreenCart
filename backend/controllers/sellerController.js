import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

// Login Seller : /api/seller/login
export const loginSeller = async (req, res) => {
    try {
         const {email, password} = req.body;
         if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: process.env.NODE_ENV === 'production' ? "none" : 'strict', // Prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
            });
            return res.json({
                success: true,
                message: "Seller logged in successfully"
            });
         }
         else{
            return res.json({
                success: false,
                message: "Invalid email or password"
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

// authSeller : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
}

// Logout Seller : /api/seller/logout
export const logoutSeller = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : 'strict'
        });
        return res.json({
            success: true,
            message: "Logged Out"
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        });
    }
}