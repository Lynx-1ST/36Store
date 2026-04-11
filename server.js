import express from "express";
import mongoose from "mongoose";
import routes from "./routes/client/index.routes.js";

// Kết nối DB
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

app.use(express.static("public"));

// Routes
routes(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
