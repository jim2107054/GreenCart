import express from 'express';
import { isSellerAuth, loginSeller, logoutSeller } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

// Import seller controller functions
sellerRouter.post('/login', loginSeller)
sellerRouter.get('/is-auth', authSeller, isSellerAuth); // Check if seller is authenticated
sellerRouter.get('/logout', authSeller, logoutSeller); // Logout seller

export default sellerRouter;