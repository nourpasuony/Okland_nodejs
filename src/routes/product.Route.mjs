import { isSuberadmin , logRequest } from "../Middleware/product.mjs";
import express from "express";
import { addProduct , updateProduct , deleteProduct , getAllProducts , foundProductById  } from "../controllers/superAdminProduct.mjs";
const router = express.Router();
const app = express();
app.use(isSuberadmin);

// Create a new product
router.post("/create-Product/:_id",isSuberadmin, logRequest, addProduct);

// Update a product
router.put("/update-Product/:id/:_id", isSuberadmin, logRequest, updateProduct);

// Delete a product
router.delete("/delete-Product/:id/:_id",isSuberadmin,  logRequest, deleteProduct);

// Get all products
router.get("/get-All-Products", isSuberadmin ,logRequest, getAllProducts);

// Get a product by id
router.get("/get-Product/:id/:_id",isSuberadmin,logRequest, foundProductById);

export default router;