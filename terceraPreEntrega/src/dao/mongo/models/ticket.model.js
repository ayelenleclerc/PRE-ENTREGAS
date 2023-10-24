import mongoose from "mongoose";

const codeTicket = () => Date.now().toString(15);

const collection = "tickets";

const cartSubSchema = new mongoose.Schema({
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "carts",
  },
});

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      codeTicket,
    },
    purchase_datetime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    purchaser: {
      type: String,
      required: true,
    },
    carts: {
      type: [cartSubSchema],
    },
  },
  {
    timestamps: true,
  }
);

schema.pre(["find", "findOne"], function () {
  this.populate("carts.cart");
});

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
