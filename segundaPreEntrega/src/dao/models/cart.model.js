import mongoose from "mongoose";
import { productModel } from "./product.model.js";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

export const cartModel = mongoose.model("carts", cartSchema);
