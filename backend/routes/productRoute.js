import express from "express";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import upload from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

productRouter.post('/add',upload.array(['images']),authSeller,addProduct); // Route to add a new product
productRouter.get('/list', productList); // Route to get all products
productRouter.get('/id', productById);
productRouter.post('/stock', authSeller, changeStock); // Route to change product stock status

export default productRouter;