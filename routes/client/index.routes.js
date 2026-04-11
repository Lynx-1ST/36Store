import productRoutes from "./products.routes.js";
import contactRoutes from "./contact.routes.js";
export default (app) => {
  app.get("/", (req, res) => {
    res.render("index", {
      pageTitle: "Trang chủ",
      message: "Xin chào các bạn !",
    });
  });

  // Redirecting routes -> server.js
  app.use("/products", productRoutes);
  app.use("/contact", contactRoutes);

  app.get("/blog", (req, res) => {
    res.send("<h1>Trang danh sách bài viết</h1> <a href='/'>Về trang chủ</a>");
  });
};
