import express from "express";
import Contact from "../../models/contact.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact", {
    pageTitle: "Liên hệ với chúng tôi",
  });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.render("contact", {
        errorMessage: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    return res.render("contact", {
      successMessage: "Gửi thành công!",
    });
  } catch (error) {
    console.error(error);
    return res.send("Lỗi!");
  }
});

export default router;
