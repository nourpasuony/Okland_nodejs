import { roles } from "../config/roles.mjs";
import Superadmin from "../models/Auth.models.mjs";
import product from "../models/product.models.mjs";
export const isSuberadmin = async (req, res, next) => {
    try {
        const superadminId = req.params._id;
        const superadmin =  await Superadmin.findById(superadminId);
        if (!superadmin) {
            return res.status(404).json({ message: "Superadmin only can access" });
        }
        if (superadmin.roles !== "superadmin") {
            return res.status(403).json({ message: "Permission denied" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

export const validateQRCode = async (req , res) => {
    try {
        const { productId } = req.params;

        //serach for the product
        const foundProduct = await product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        //validate the qr code expiration date
        const currentDate = new Date();
        const warrantyEndDate = new Date(foundProduct.warrantyEndDate);
        if (currentDate > warrantyEndDate) {
            return res.status(400).json({ message: "QR Code expired" });
        }
        res.status(200).json({ message: "QR Code is valid" });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};