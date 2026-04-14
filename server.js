import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin/index.routes.js";
import clientRoutes from "./routes/client/index.routes.js";

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/products-manager");
  console.log("Kết nối Database thành công!");
} catch (error) {
  console.log("Lỗi kết nối Database:", error);
}

const app = express();
const port = 3000;

// REQ: CLIENT -> ROUTING -> CONTROLLER -> MODEL -> DB
// RES: DB -> MODEL -> CONTROLLER -> VIEW -> CLIENT
app.set("views", "./views");
app.set("view engine", "pug");

app.use(cookieParser());
// Middleware parse data
app.use(express.static("public"));
// Form HTML (method="POST")
app.use(express.urlencoded({ extended: true }));
// JSON (API)
app.use(express.json());
app.use("/admin", adminRoutes);

clientRoutes(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
