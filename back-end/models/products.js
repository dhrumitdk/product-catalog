import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: String,
  productImageUrl: String,
  productDescription: String,
  productQuantity: Number,
  productPrice: Number,
  addedToCart: Boolean,
});

export default mongoose.model("products", productSchema);
