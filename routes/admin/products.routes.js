import express from "express";
import Product from "../../models/product.model.js";

const routes = express.Router();

//- [Get]
routes.get("/", async (req, res) => {
  try {
    await Product.updateMany(
      { deleted: { $exists: false } },
      { $set: { deleted: false } },
    );

    const products = await Product.find({ deleted: false });
    res.render("admin/products", {
      pageTitle: "Quản lí sản phẩm",
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi lấy dữ liệu");
    res.redirect("/admin/dashboard");
  }
});
//- [Get]
routes.get("/create", async (req, res) => {
  res.render("admin/products-create", {
    pageTitle: "Thêm mới Sản phẩm",
  });
});
//- [Post]
routes.post("/create", async (req, res) => {
  try {
    const productsData = req.body;
    if (productsData.price) {
      productsData.price = parseInt(productsData.price);
    }
    const newProduct = new Product(productsData);
    await newProduct.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    res.send("Có lỗi xảy ra!");
  }
});

// [POST] - Xoá
routes.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(), // Lưu lại thời gian xóa
      },
    );
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    res.redirect("/admin/products");
  }
});
export default routes;
