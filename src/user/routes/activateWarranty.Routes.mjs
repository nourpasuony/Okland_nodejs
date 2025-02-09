import express from "express";
import { activateWarranty  } from "../controllers/activateWarranty.mjs";
import { warrantyEndDate } from '../../controllers/superAdminProduct.mjs';
const router = express.Router();

router.post("/activateWarranty/:productId", activateWarranty );

export default router;