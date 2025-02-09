// import jwt from "jsonwebtoken";
// import { tokenKeys } from "../Config/token.mjs";
// import Superadmin from "../models/Auth.models.mjs";
// //authenticate
// export const authenticate = async (req, res, next) => {
//   try {
//       // استخراج الـ token من header الطلب
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) {
//           return res.status(401).json({ message: "No token provided" });
//       }

//       // التحقق من صحة الـ token
//       let decoded;
//       try {
//           decoded = jwt.verify(token, tokenKeys.secretKey);
//       } catch (error) {
//           console.log(error);
//           return res.status(401).json({ message: "Invalid token" });
//       }

//       // البحث عن superadmin في قاعدة البيانات
//       let superadmin = await Superadmin.findById(decoded._id);
//       console.log("Decoded token:", decoded); // طباعة decoded للتحقق
//       console.log("Superadmin:", superadmin); // طباعة superadmin للتحقق

//       // التحقق من أن المستخدم هو superadmin
//       if (!superadmin || superadmin.roles !== "superadmin") {
//           console.log("Superadmin roles:", superadmin?.roles); // طباعة roles للتحقق
//           return res.status(403).json({ message: "Only superadmin can perform this action" });
//       }

//       // إضافة معلومات المستخدم إلى الطلب للمراحل التالية
//       req.superadmin = superadmin;
//       next();
//   } catch (error) {
//       console.log(error);
//       return res.status(401).json({ message: "Invalid token" });
//   }
// };
//   // 2. التحقق من صحة الـ token
//   // try {
//   //   const decoded = verifyToken(token, tokenKeys.secretKey); // التحقق من صحة الـ token
//   //   const superadmin = await Superadmin.findById(decoded.id); // البحث عن superadmin في قاعدة البيانات

//   //   // التحقق من وجود الـ token في قاعدة البيانات
//   //   if (!superadmin || !superadmin.tokens.includes(token)) {
//   //     throw new Error("Token not found in database");
//   //   }

//   //   req.user = decoded; // إضافة بيانات المستخدم إلى الطلب (req)
//   //   next(); // الانتقال إلى Middleware التالي
//   // } catch (error) {
//   //   return res.status(401).json({ message: "Invalid or expired token" });
//   // }
// //};



// export const authorize = (roles) => {
//   return (req, res, next) => {
//     // 1. التحقق من أن المستخدم لديه الدور المطلوب
//     if (req.superadmin.roles !== roles) {
//       return res.status(403).json({ message: "Unauthorized access" });
//     }
//     next(); // الانتقال إلى Middleware التالي
//   };
// };