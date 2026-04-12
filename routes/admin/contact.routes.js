import express from "express";
import mongoose from "mongoose"; // Đã bổ sung import
import Contact from "../../models/contact.model.js";

const router = express.Router();

// [GET] danh sách contact
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.render("admin/contacts", {
      pageTitle: "Liên hệ",
      contacts,
    });
  } catch (error) {
    console.error(error);
    return res.send("Lỗi!");
  }
});

// [POST] xoá
router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/admin/contacts");
    }

    await Contact.deleteOne({ _id: id });

    return res.redirect("/admin/contacts");
  } catch (error) {
    console.log("Có lỗi khi xoá: ", error);
    return res.redirect("/admin/contacts");
  }
});

// [POST] /admin/contacts/change-status/:id
router.post("/change-status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newStatus = req.body.status;

    await Contact.updateOne({ _id: id }, { status: newStatus });

    res.redirect("/admin/contacts");
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.redirect("/admin/contacts");
  }
});
export default router;
