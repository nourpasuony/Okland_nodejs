import express from 'express';
import  generateQRCode  from '../controllers/generateQR.mjs'; 
import { validateQRCode } from '../Middleware/product.mjs';
import { warrantyEndDate } from '../controllers/superAdminProduct.mjs';

import mongoose from 'mongoose';
const router = express.Router();

// Generate QR code
router.get('/generate-qrcode/:productId', generateQRCode , warrantyEndDate );

// router.get('/generate-qrcode/:productId', async (req, res) => {
//     try {
//         const { productId } = req.params;

//         // تحقق من أن productId هو ObjectId صالح
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({ message: "Invalid productId" });
//         }

//         const warrantyEndDate = new Date(); // تاريخ انتهاء الضمان
//         const qrCode = await generateQRCode(productId, warrantyEndDate);
        
//         res.status(200).json({ qrCode });
//     } catch (error) {
//         console.error("Error generating QR Code:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });



//validate QR code Date
router.get("/validate-qrcode/:productId", validateQRCode , warrantyEndDate);


export default router;