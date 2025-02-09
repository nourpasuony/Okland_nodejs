import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { roles } from "../../src/config/roles.mjs";
import validator from "validator";
const superadminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      default: "okland", // اسم المستخدم الثابت
      // immutable: true, // يجعل الحقل غير قابل للتعديل
    },
    password: {
      type: String,
      required: true,
      default: "okland123", // كلمة المرور الافتراضية
      // immutable: true, // يجعل الحقل غير قابل للتعديل
    },
    roles: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "superadmin", // الدور الثابت
      immutable: true, // يجعل الحقل غير قابل للتعديل
    },
    token: { type: String }, // حقل جديد لتخزين التوكن

  });
  // Auth.models.mjs
export const defaultCredentials = {
  username: "okland",
  password: "okland123"
};
// Check if password matches the user's password
superadminSchema.methods.isPasswordMatch = async function (password) {
    const superAdmin = this;
    return await bcrypt.compare(password, superAdmin.password); // استخدام bcrypt.compare
  };
  
  // Check if password is modified before the user save
superadminSchema.pre("save", async function (next) {
    const superAdmin = this;
  
    // && !user.facebookId && !user.googleId && !user.appleId
  
    if (superAdmin.isModified("password")) {
      superAdmin.password = await bcrypt.hash(superAdmin.password, 8);
    }
    next();
  });
  
  
  
  
export default mongoose.model("Superadmin", superadminSchema);
