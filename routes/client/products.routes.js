import express from "express";
import Product from "../../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });

    return res.render("products", {
      pageTitle: "Danh sách sản phẩm",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi lấy dữ liệu");
  }
});

export default router;
