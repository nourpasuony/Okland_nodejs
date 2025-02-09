// controllers/adminLoginBySuperadmin.mjs
import Admin from "../admin/models/authAdmin.models.mjs";

export const createAdminBySuperadmin = async (username, password, email, phonenum, role, createdBy) => {
    try {
        const admin = new Admin({
            username,
            password,
            email,
            phonenum,
            role,
            createdBy
        });

        await admin.save(); // حفظ الأدمن في قاعدة البيانات
        return admin;
    } catch (error) {
        throw new Error(error.message);
    }
};


// import Admin from "../admin/models/authAdmin.models.mjs";
// import bcrypt from "bcrypt";
// import Superadmin from "../models/Auth.models.mjs";

// // مثال على استخدام return بشكل صحيح
// export const createAdminBySuperadmin = async (superadminId, username, password, email, phonenum, photo) => {
//     try {
//       // verify if superadmin is valid
//       const superadmin = await Superadmin.findById(superadminId);
//       if (!superadmin || superadmin.role !== "superadmin") {
//         throw new Error("Only superadmin can create admins");
//       }
  
//       // verify if admin already exists
//       const adminExist = await Admin.findOne({ $or: [{ username }, { email }, { phonenum }] });
//       if (adminExist) {
//         throw new Error("Admin already exists");
//       }
  
//       // create new admin
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const admin = new Admin({
//         username,
//         password: hashedPassword,
//         email,
//         phonenum,
//         photo,
//         role: "admin",
//       });
//       await admin.save();
//       return admin;
//     } catch (error) {
//       throw error;
//     }
//   };