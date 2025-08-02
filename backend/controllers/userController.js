import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from './../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// register User : /api/user/register
export const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body 
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message:" Missing Details"
            })
        }

        // Validate email format
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // create token 
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
        });

        return res.json({
            success: true,
            message: "User Created Successfully",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: error.message
        });
    }
}

// Login User : /api/user/login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({
                success: false,
                message: "Missing email or password"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        // Create token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
        });

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Check Authentication Status : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const {userId} = req.body;
        if(!userId){
            return res.json({
                success: false,
                message: "User not authenticated"
            });
        }

        const user = await User.findById(userId).select("-password"); // Exclude password from the response
        return res.json({
            success: true,
            message: "User is authenticated",
            user
        });
    } catch (error) {
        console.log(error.message)
        return res.json({
            success: false,
            message: error.message
        })
    }
}