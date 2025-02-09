import express from "express";
import { getSuperadminById } from "../../src/controllers/superadminById.mjs";

const router = express.Router();

router.get("/:id", getSuperadminById);

export default router;