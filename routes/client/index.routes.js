import productRoutes from "./products.routes.js";
import contactRoutes from "./contact.routes.js";
// 👇 1. NHỚ IMPORT MODEL SẢN PHẨM VÀO ĐÂY NHÉ
import Product from "../../models/product.model.js";

export default (app) => {
  // Trang chủ (Đã nâng cấp có lấy dữ liệu)
  // 👇 2. Thêm chữ "async" vì chúng ta gọi Database
  app.get("/", async (req, res) => {
    try {
      // 👇 3. Lấy 8 sản phẩm mới nhất, chưa bị xóa
      const products = await Product.find({ deleted: false })
        .sort({ createdAt: -1 })
        .limit(8);

      return res.render("index", {
        // Đảm bảo đúng đường dẫn file Pug của bạn
        pageTitle: "Trang chủ - 36Store",
        message: "Xin chào các bạn!",
        products: products, // 👇 4. Ném cục data này sang cho file index.pug
      });
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error);
      res.send("Hệ thống đang bận, vui lòng thử lại sau.");
    }
  });

  // Routes
  app.use("/products", productRoutes);
  app.use("/contact", contactRoutes);

  // Blog (Tạm thời để demo)
  app.get("/blog", (req, res) => {
    return res.send(
      "<h1>Trang danh sách bài viết</h1><a href='/'>Về trang chủ</a>",
    );
  });
};
