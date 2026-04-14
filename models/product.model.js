import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    brand: String,
    sku: String,

    price: Number,
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    minimumOrderQuantity: {
      type: Number,
      default: 1,
    },
    weight: Number,

    tags: [String],

    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },

    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,

    reviews: [
      {
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail: String,
      },
    ],

    meta: {
      barcode: String,
      qrCode: String,
    },

    images: [String],
    thumbnail: String,

    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
