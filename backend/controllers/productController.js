import {v2 as cloudinary} from "cloudinary";
import Product from "../models/product.js";

// Add Product : /api/product/add
export const addProduct = async (req, res) =>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        // let imageUrl = [];
        // for (let i = 0; i < images.length; i++) {
        //     const result = await cloudinary.uploader.upload(images[i].path, {
        //         folder: "products",
        //     });
        //     imageUrl.push({
        //         public_id: result.public_id,
        //         url: result.secure_url,
        //     });
        // }

        let imageUrl = await Promise.all(
            images.map( async (image) => {
                let result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        )

        await Product.create({
            ...productData,
            image: imageUrl
        });

        res.json({ success: true, message: "Product added" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get All Products : /api/product/list
export const productList = async (req, res) =>{
    try {
        const products = await Product.find({}); // Fetch all products from the database
        res.json({ success: true, products });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Product by ID : /api/product/:id
export const productById = async (req, res) => {
    try {
        const {id} = req.body; // Get product ID from request body
        const product = await Product.findById(id) // Fetch product by ID
        if(!product){
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const {id, inStock} = req.body; // Get product ID and inStock status from request body
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Product stock updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}