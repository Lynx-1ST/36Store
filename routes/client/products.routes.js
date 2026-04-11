import express from "express";
import Product from "../../models/product.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products", {
      pageTitle: "Danh sách sản phẩm",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi lấy dữ liệu");
  }
});

export default routes;
