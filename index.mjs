import express from "express";
import { fileURLToPath } from "url"; // استيراد fileURLToPath
import { dirname, join } from "path"; // استيراد dirname و join
import { config } from "dotenv"; // استيراد dotenv
import "./src/models/db.models.mjs"; // استيراد ملف الاتصال بقاعدة البيانات
import cors from "cors";
import cookieParser from "cookie-parser"; 
// الحصول على __dirname في ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تحميل متغيرات البيئة من ملف .env
config({ path: join(__dirname, "./.env") });

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors()); 


// Superadmin routes
import {
  adminBySuperadmin,
  authSuperadmin,
  superadminById,
  product,
  qrCode,
  activateWarranty

} from "./src/routes/index.mjs";

app.use(
  "/api/v1/",
  adminBySuperadmin,
  authSuperadmin,
  superadminById,
  product,
  qrCode,
  activateWarranty
);

// Home route
app.get("/", function (req, res) {
  res.json({
    data: "home",
    status: "200",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on: http://localhost:${process.env.PORT}`);
});