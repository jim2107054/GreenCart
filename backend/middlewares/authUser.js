import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const authUser = (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({
            success: false,
            message: "Not Authorized"
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }
        else{
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }
        next(); // It will execute the controller function if the token is valid
    } catch (error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export default authUser;
// This middleware checks if the user is authenticated by verifying the JWT token.
// If the token is valid, it adds the user ID to the request body and calls next() to proceed.
// If not, it returns a JSON response indicating that the user is not authorized.