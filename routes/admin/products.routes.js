import express from "express";
import mongoose from "mongoose";
import Product from "../../models/product.model.js";

const router = express.Router();

// [GET] Danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ deleted: { $ne: true } });

    return res.render("admin/products", {
      pageTitle: "Quản lí sản phẩm",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi lấy dữ liệu");
  }
});

// [GET] Form tạo sản phẩm
router.get("/create", (req, res) => {
  return res.render("admin/products-create", {
    pageTitle: "Thêm mới sản phẩm",
  });
});

// [POST] Tạo sản phẩm
router.post("/create", async (req, res) => {
  try {
    const { title, price, ...rest } = req.body;

    if (!title || !price) {
      return res.send("Thiếu title hoặc price");
    }

    const newProduct = new Product({
      title: title.trim(),
      price: parseInt(price) || 0,
      ...rest,
    });

    await newProduct.save();

    return res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi tạo:", error);
    return res.send("Có lỗi xảy ra!");
  }
});

// [POST] Xoá
router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/admin/products");
    }

    await Product.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      },
    );

    return res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    return res.redirect("/admin/products");
  }
});

// [GET] Sửa
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/admin/products");
    }
    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });
    if (product) {
      res.render("admin/products-edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product,
      });
    } else {
      res.redirect("/admin/products");
    }
  } catch (error) {
    console.error("Lỗi khi sửa:", error);
    return res.redirect("/admin/products");
  }
});

//- [POST] Sửa
router.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (data.price) {
      data.price = parseInt(data.price) || 0;
    }
    await Product.updateOne({ _id: id }, data);
    return res.redirect("/admin/products");
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    return res.redirect("back");
  }
});
export default router;
