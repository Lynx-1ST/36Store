import express from "express";
import productRoutes from "./products.routes.js";

const routes = express.Router();
// [Get]
routes.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    pageTitle: "Tổng quan - Admin",
  });
});

routes.use("/products", productRoutes);

export default routes;
