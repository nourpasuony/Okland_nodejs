import QRCode from 'qrcode';
import { stringify } from "flatted";
import pako from 'pako';
import mongoose from 'mongoose';
import product from '../models/product.models.mjs';
import { warrantyEndDate } from './superAdminProduct.mjs';
// Generate QR code


export default async function generateQRCode(req, res) {
    try {
        const productId = req.params.productId;

        // Check if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: "Invalid productId" });
        }

        const qrData = {
            productId,
            warrantyEndDate,
        };

        // Convert the object to JSON, compress it, and convert it to base64
        const jsonString = stringify(qrData);
        const compressedData = pako.deflate(jsonString, { to: 'string' });
        const base64Data = Buffer.from(compressedData).toString('base64');

        // Generate QR Code
        const qrCode = await QRCode.toDataURL(base64Data);

        // Store QR Code in the database
        await product.updateOne(
            { _id: new mongoose.Types.ObjectId(productId) },
            { $set: { qrCode: qrCode } }
        );

        console.log("QR Code generated and stored successfully:", qrCode);
        return res.status(200).send({ qrCode });
    } catch (error) {
        console.log("Error generating QR Code:", error);
        return res.status(500).send({ message: "Error generating QR Code" });
    }
}
// export default function generateQRCode(newProduct._id, warrantyEndDate){
//     newProduct.qrCode = qrCode;
//     try {
//                 // تحقق من أن productId هو ObjectId صالح
//                 if (!mongoose.Types.ObjectId.isValid(productId)) {
//                     throw new Error("Invalid productId");
//                 }
//          // Generate QR code
        
//                 const qrData = {
//                     productId,
//                     warrantyEndDate,
//                 };
        
//                 // تحويل الكائن إلى JSON ثم ضغطه
//                 const jsonString = stringify(qrData);
//                 const compressedData = pako.deflate(jsonString, { to: 'string' });
//                 const base64Data = Buffer.from(compressedData).toString('base64');
        
//                 // إنشاء QR Code
//                 const qrCode = await QRCode.toDataURL(base64Data);
        
//                 // تخزين QR Code في قاعدة البيانات
//                 await product.updateOne(
//                     { _id: new mongoose.Types.ObjectId(productId) }, // استخدام new لإنشاء ObjectId
//                     { $set: { qrCode: qrCode } }
//                 );
        
//                 console.log("QR Code generated and stored successfully:", qrCode);
//                 return qrCode;
//             } catch (error) {
//                 console.log("Error generating QR Code:", error);
//                 throw error;
//             }
//         };






// export async function generateQRCode(productId, warrantyEndDate) {
//     try {
//         // تحقق من أن productId هو ObjectId صالح
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             throw new Error("Invalid productId");
//         }
//  // Generate QR code

//         const qrData = {
//             productId,
//             warrantyEndDate,
//         };

//         // تحويل الكائن إلى JSON ثم ضغطه
//         const jsonString = stringify(qrData);
//         const compressedData = pako.deflate(jsonString, { to: 'string' });
//         const base64Data = Buffer.from(compressedData).toString('base64');

//         // إنشاء QR Code
//         const qrCode = await QRCode.toDataURL(base64Data);

//         // تخزين QR Code في قاعدة البيانات
//         await product.updateOne(
//             { _id: new mongoose.Types.ObjectId(productId) }, // استخدام new لإنشاء ObjectId
//             { $set: { qrCode: qrCode } }
//         );

//         console.log("QR Code generated and stored successfully:", qrCode);
//         return qrCode;
//     } catch (error) {
//         console.log("Error generating QR Code:", error);
//         throw error;
//     }
// }
// export function calculateWarrantyEndDate(purchaseDate , warrantyPeriod){
//     const warrantyEndDate = new Date(purchaseDate);
//     warrantyEndDate.setDate(warrantyEndDate.getDate() + warrantyPeriod);
//     return warrantyEndDate;
    
// };

