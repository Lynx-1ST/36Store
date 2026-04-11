import express from "express";

const routes = express.Router();

// [GET] /contact
routes.get("/", async (req, res) => {
  res.render("contact", {
    pageTitle: "Trang liên hệ",
    message: "Xin chào các bạn",
  });
});

// [POST] /contact
routes.post("/", async (req, res) => {
  const userNote = req.body;
  console.log("Note: ", userNote);

  res.render("contact", {
    pageTitle: "Liên hệ",
    successMessage: "Cảm ơn bạn! Chúng tôi đã nhận được thông tin.",
  });
});

export default routes;
