import productRoutes from "./products.routes.js";
import contactRoutes from "./contact.routes.js";
import Product from "../../models/product.model.js";
import cartRoutes from "../../models/cart.model.js";
export default (app) => {
  app.get("/", async (req, res) => {
    try {
      const products = await Product.find({ deleted: { $ne: true } })
        .sort({ createdAt: -1 })
        .limit(8);

      return res.render("index", {
        pageTitle: "Trang chủ - 36Store",
        message: "Xin chào các bạn!",
        products: products,
      });
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error);
      res.send("Hệ thống đang bận, vui lòng thử lại sau.");
    }
  });

  // Routes
  app.use("/products", productRoutes);
  app.use("/contact", contactRoutes);
  app.use("/cart", cartRoutes);

  app.get("/blog", (req, res) => {
    return res.send(
      "<h1>Trang danh sách bài viết</h1><a href='/'>Về trang chủ</a>",
    );
  });
};
