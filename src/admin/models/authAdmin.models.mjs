// models/AdminModel.mjs
import mongoose from "mongoose";
import { roles } from "../../../src/config/roles.mjs";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenum: { type: String, required: true },
    role: { type: String, required: true },
    //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Superadmin", required: true }, // معرف السوبر أدمن الذي قام بإنشاء الأدمن
    //createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;


// import { Schema, model, Types } from "mongoose";
// import bcrypt from "bcryptjs";
// import validator from "validator";
// import { roles } from "../../../src/config/roles.mjs";
//  const adminSchema = new Schema({
//     username :{
//         type : String,
//         required : true,
//         unique : true,
//         trim : true,
//     },
//     phonenum :{
//         type : Number,
//         required : true,
//         unique : true,
//         validate: {
//             validator: function (value) {
//               return validator.isMobilePhone(value, "ar-EG");
//             },
//             message: (props) => `${props.value} is not a valid phone!`,
//           },
//     },

//     email :{
//         type : String,
//         required : true,
//         unique : true,
//     },

//     photo:{
//         type : String,
//     },

//     password :{
//         type : String,
//         required : true,
        
//     },
//     roles:{
//         type : String,
//         enum : roles,
//         default : "admin",
//         immutable : true,
//     }
// });

// // Check if password matches the user's password
// adminSchema.methods.isPasswordMatch = async function (password) {
//     const admin = this;
//     return await bcrypt.compare(password, admin.password); // استخدام bcrypt.compare
//   };
  
//   // Check if password is modified before the user save
// adminSchema.pre("save", async function (next) {
//     const admin = this;
  
//     // && !user.facebookId && !user.googleId && !user.appleId
  
//     if (admin.isModified("password")) {
//       admin.password = await bcrypt.hash(admin.password, 8);
//     }
//     next();
//   });
  


// const Admin = model("Admin", adminSchema);


// export default Admin;


