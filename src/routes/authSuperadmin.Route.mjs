import express from "express";
import { loginSuperadmin , logoutSuperadmin } from "../../src/controllers/authSuperadmin.mjs";

const router = express.Router();

//logn superadmin
router.post("/login", loginSuperadmin);

// logout superadmin
router.post("/logout", logoutSuperadmin);




export default router;