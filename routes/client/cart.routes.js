import express from "express";
import Cart from "../../models/cart.model.js";

const router = express.Router();

router.post("/add/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    let cartId = req.cookies.cartId; // (Cookie)

    // 1. Nếu khách mới vào web, chưa có giỏ hàng
    if (!cartId) {
      // Tạo giỏ hàng mới
      const newCart = new Cart();
      await newCart.save();

      // Cookie hết hạn
      res.cookie("cartId", newCart.id, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      cartId = newCart.id;
    }

    // 2. Lấy giỏ hàng ra và kiểm tra
    const cart = await Cart.findById(cartId);
    const existProduct = cart.products.find(
      (item) => item.product_id === productId,
    );

    if (existProduct) {
      // Nếu có -> cộng dồn
      existProduct.quantity += quantity;
    } else {
      // Nếu chưa -> Bỏ món mới vào giỏ
      cart.products.push({
        product_id: productId,
        quantity: quantity,
      });
    }

    // 3. Lưu lại và ở lại trang cũ
    await cart.save();
    res.redirect("back");
  } catch (error) {
    console.error("Lỗi thêm giỏ hàng:", error);
    res.redirect("back");
  }
});

export default router;
