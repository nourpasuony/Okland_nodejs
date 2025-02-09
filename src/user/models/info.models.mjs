import mongoose from "mongoose";
const infoScjema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        trim : true
    },
    isMobilePhone : {
        type : String,
        required : true,
    },
    invoicePhoto : {
        type : String,
        required : true,
    },
    nameshop : {
        type : String,
    },
    shopnumber : {
        type : Number,
    },
    purchaseDate : {
        type : String,
        required : true,
    },
    productId: {
        type: String,
    },

  userData:{
    type:  Object,
  },


  warrantyStartDate: {
    type : Date,
  },

  warrantyExpirationDate: {
    type : Date,
  }
});
const Info = mongoose.model("Info", infoScjema);

export default Info;