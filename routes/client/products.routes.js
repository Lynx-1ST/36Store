import express from "express";
import mongoose from "mongoose";
import Product from "../../models/product.model.js";

const router = express.Router();

// [GET] /products - Trang danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    // Sửa thành $ne: true để lấy cả sản phẩm cũ chưa có trường deleted
    const products = await Product.find({ deleted: { $ne: true } });

    return res.render("client/products", {
      pageTitle: "Danh sách sản phẩm",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi lấy dữ liệu");
  }
});

// [GET] /products/detail/:id - Trang chi tiết
router.get("/detail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/products");
    }

    const product = await Product.findOne({
      _id: id,
      deleted: { $ne: true }, // Sửa ở đây nữa nhé
    });

    if (!product) return res.redirect("/products");

    res.render("client/product-detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    console.error("Lỗi trang chi tiết:", error);
    res.redirect("/");
  }
});

export default router;
