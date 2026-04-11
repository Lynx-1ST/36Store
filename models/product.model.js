import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  brand: String,
  rating: Number,
  thumbnail: String,
});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
