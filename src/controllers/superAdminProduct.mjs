import product from "../models/product.models.mjs";
import mongoose from "mongoose";//import role from "../Middleware/product.mjs";
import QRCode from 'qrcode';
const warrantyEndDate = (warrantyPeriod, warrantyPeriodUnit) => {
    if (warrantyPeriodUnit === 'days') {
      return new Date(Date.now() + warrantyPeriod * 24 * 60 * 60 * 1000);
    } else if (warrantyPeriodUnit === 'months') {
      return new Date(Date.now() + warrantyPeriod * 30 * 24 * 60 * 60 * 1000);
    } else if (warrantyPeriodUnit === 'years') {
      return new Date(Date.now() + warrantyPeriod * 365 * 24 * 60 * 60 * 1000);
    } else if (warrantyPeriodUnit === 'hours') {
      return new Date(Date.now() + warrantyPeriod * 60 * 60 * 1000);
    }
  }
  
  
export const  addProduct = async (req,res) =>{
    try{
        const { productName , productType , productDescription , warrantyPeriod , warrantyPeriodUnit  } = req.body;
        if (warrantyPeriodUnit === 'days' && warrantyPeriod < 1) {

            throw new Error('Warranty period must be at least 1 day');
          } else if (warrantyPeriodUnit === 'months' && warrantyPeriod < 1) {
            throw new Error('Warranty period must be at least 1 month');
          } else if (warrantyPeriodUnit === 'years' && warrantyPeriod < 1) {
            throw new Error('Warranty period must be at least 1 year');
          } else if (warrantyPeriodUnit === 'hours' && warrantyPeriod < 1) {
            throw new Error('Warranty period must be at least 1 hour');
          }
        // Check if the product already exists
        const existingProduct = await product.findOne({ productName });
        if (existingProduct) {
            return res.status(400).send("Product already exists");
        }
      
        // إنشاء QR Code
        //const qrCode = await generateQRCode(productName, warrantyEndDate);const warrantyEndDate = (warrantyPeriod, warrantyPeriodUnit) => {
        
        // Create a new product
        const newProduct = new product({
            productName,
            productType,
            productDescription,
            warrantyPeriod,
            warrantyPeriodUnit,
            warrantyEndDate: warrantyEndDate(warrantyPeriod, warrantyPeriodUnit) // تمرير قيم warrantyPeriod و warrantyPeriodUnit إلى دالة warrantyEndDate

        });
       

        // Save the product in db
        await newProduct.save();
        res.status(201).json("Product added successfully");
        } catch (error) {
        res.status(500).json(error.message);
    };
};

//update product
export const updateProduct = async (req,res) =>{
    try{
        const { id } = req.params;
        const {  productName , productType , productDescription , warrantyPeriod ,warrantyPeriodUnit } = req.body;
        // search for the product and update it
        const updatedProduct = await product.findByIdAndUpdate(
            id,
            {  productName , productType , productDescription , warrantyPeriod , warrantyPeriodUnit },
            { new: true }
        );
        if(!updatedProduct){
            return res.status(404).json("Product not found");
        };
        res.status(200).json("Product updated successfully");
    }catch(error){
        res.status(500).json(error.message);
    }
};


//delete product
export const deleteProduct = async (req,res) =>{
    try{
        const { id } = req.params;
        // search for the product and delete it
        const deletedProduct = await product.findByIdAndDelete(id); 

        if(!deletedProduct){
            return res.status(404).json("Product not found");
        } 
        res.status(200).json("Product deleted successfully");
    }catch(error){
        res.status(500).json(error.message);
    }
};


//get all products
export const getAllProducts = async (req,res) => {
    try {
        const products = await product.find({});
        console.log(products);
        res.status(200).json({data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//get product by id
export const foundProductById = async (req,res) =>{
    try {
        const { id } = req.params;

        // التحقق من صحة ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // البحث عن المنتج
        const foundProduct = await product.findById(id);

        // التحقق من وجود المنتج
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // إرجاع المنتج
        res.status(200).json({ product: foundProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Product not found" });
    }
};
export { warrantyEndDate };
