import Info from "../models/info.models.mjs";
import { roles } from "../../config/roles.mjs";
import mongoose from "mongoose";
import { addProduct } from "../../controllers/superAdminProduct.mjs";
import Product from "../../models/product.models.mjs";
const warrantyEndDate = (warrantyPeriod, warrantyPeriodUnit) => {
  if (warrantyPeriodUnit === "days") {
    return new Date(Date.now() + warrantyPeriod * 24 * 60 * 60 * 1000);
  } else if (warrantyPeriodUnit === "months") {
    return new Date(Date.now() + warrantyPeriod * 30 * 24 * 60 * 60 * 1000);
  } else if (warrantyPeriodUnit === "years") {
    return new Date(Date.now() + warrantyPeriod * 365 * 24 * 60 * 60 * 1000);
  } else if (warrantyPeriodUnit === "hours") {
    return new Date(Date.now() + warrantyPeriod * 60 * 60 * 1000);
  }
};

export const activateWarranty = async (req, res) => {
  try {
    const { productId } = req.params;
    const { purchaseDate } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Product ID is not valid" });
    }

    if (!purchaseDate) {
      return res.status(400).json({ message: "Please provide purchase date" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const warrantyPeriod = product.warrantyPeriod;
    const warrantyPeriodUnit = product.warrantyPeriodUnit;
    const warrantyExpirationDate = warrantyEndDate(
      warrantyPeriod,
      warrantyPeriodUnit,
      purchaseDate
    );

    const existingWarranty = await Info.findOne({ productId });
    if (existingWarranty) {
      return res.status(400).json({ message: "Warranty already exists" });
    }

    const warranty = new Info({
      username: req.body.username,
      isMobilePhone: req.body.isMobilePhone,
      invoicePhoto: req.body.invoicePhoto,
      nameshop: req.body.nameshop,
      shopnumber: req.body.shopnumber,
      userData: { productId: req.params.productId },
      purchaseDate: req.body.purchaseDate,
      warrantyStartDate: new Date(),
      warrantyExpirationDate: warrantyExpirationDate,
    });

    await warranty.save();
    return res.status(200).json({ message: "Warranty activated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error activating warranty: " + error.message });
  }
};

//   // دالة إضافية لإنشاء تاريخ انتهاء الضمان
// export const getWarrantyExpirationDate = () => {
//     const warrantyExpirationDate = new Date();
//     warrantyExpirationDate.setFullYear(warrantyExpirationDate.getFullYear() + 1);
//     return warrantyExpirationDate;
//   };
