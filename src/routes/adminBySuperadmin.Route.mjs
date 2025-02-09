// routes/adminBySuperadmin.Route.mjs
import express from "express";
import { createAdminBySuperadmin } from "../controllers/adminLoginBySuperadmin.mjs";
import mongoose from "mongoose";
const router = express.Router();

router.post("/create-admin", async (req, res) => {
    try {
        const { username, password, email, phonenum, role } = req.body;

        // التحقق من أن req.user._id هو ObjectId صالح
        // if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        //     return res.status(400).json({ message: "Invalid user ID" });
        // }

        //const createdBy = req.user._id; // معرف السوبر أدمن الذي قام بإنشاء الأدمن
        const admin = await createAdminBySuperadmin(username, password, email, phonenum, role);

        res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;

// import express from "express";
// import mongoose from "mongoose";
// import { createAdminBySuperadmin } from "../controllers/adminLoginBySuperadmin.mjs";
// //import { authenticate, authorize } from "../Middleware/auth.mjs";

// const router = express.Router();
// //authenticate //authorize //("superadmin"), 
// router.post("/create-admin", async (req, res) => {
//     try {
//         const { username, password, email, phonenum, role } = req.body;
        
//         // التحقق من أن req.user._id هو ObjectId صالح
//         // if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
//         //     return res.status(400).json({ message: "Invalid user ID" });
//         // }

//         //const superadminId = req.user._id;
//         //const admin = await createAdminBySuperadmin(username, password, email, phonenum, role, superadminId);
        
//         res.status(201).json({ message: "Admin created successfully", admin });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// export default router;