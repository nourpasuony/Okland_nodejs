import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    productType:{
        type: String,
        required: true,
        trim: true
    },
    productDescription:{
        type: String,
        required: true,
        },
    warrantyPeriod: {
        type: String,
        required: true
     },
    warrantyPeriodUnit:{
        type: String,
        enum: ['days', 'months', 'years', 'hours'],
        required: true
    },
  qrCode: {
    type: String,
  },
  warrantyEndDate: {
   type: Date, 
  },
});

const product = mongoose.model("Product", productSchema);
export default product;