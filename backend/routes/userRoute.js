import express from 'express';
import { register } from '../controllers/userController.js';

const userRouter = express.Router();

// routes for user-related operations
userRouter.post('/register', register)

export default userRouter;