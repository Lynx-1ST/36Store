import express from "express";
import Product from "../../models/product.model.js";
import productRoutes from "./products.routes.js";
import contactRoutes from "./contact.routes.js";
import Contact from "../../models/contact.model.js";

const router = express.Router();

// [GET] Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ deleted: false });
    const totalContacts = await Contact.countDocuments();

    return res.render("admin/dashboard", {
      pageTitle: "Tổng quan - Admin",
      totalProducts,
      totalOrders: 0,
      totalContacts,
    });
  } catch (error) {
    console.error(error);
    return res.send("Lỗi dashboard");
  }
});

// Routes
router.use("/products", productRoutes);
router.use("/contacts", contactRoutes);

export default router;
