import Superadmin from "../models/Auth.models.mjs";
import mongoose from "mongoose";

export const getSuperadminById = async (req, res) => {
  try {
    // استخدام الكلمة المفتاحية `new` لإنشاء ObjectId
    const superadminId = new mongoose.Types.ObjectId(req.params.id);

    // البحث عن المستخدم في قاعدة البيانات
    const superadmin = await Superadmin.findById(superadminId);

    // إذا لم يتم العثور على المستخدم، يتم إرجاع رسالة خطأ
    if (!superadmin) {
      return res.status(404).json({ message: "Superadmin not found" });
    }

    // إذا تم العثور على المستخدم، يتم إرجاع بياناته
    res.json(superadmin);
  } catch (error) {
    console.log(error);
    // إذا حدث خطأ، يتم إرجاع رسالة خطأ مناسبة
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const getSuperadminById = async (req, res) => {
//     try {
//         const superadminId = req.params.id;
//         if (!mongoose.Types.ObjectId.isValid(superadminId)) {
//             return res.status(400).json({ message: "Invalid ID" });
//         }
//         const superadmin = await Superadmin.findById(superadminId);
//         if (!superadmin) {
//             return res.status(404).json({ message: "Superadmin not found" });
//         }
//         res.json(superadmin);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
// وظيفة للبحث عن مستخدم معين في قاعدة البيانات
