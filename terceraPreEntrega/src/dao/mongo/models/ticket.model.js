import mongoose from "mongoose";

const collection = "tickets";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    purchase_datetime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
=======
    amount: {
      type: Number,
      required:true
    },
>>>>>>> 44a531d027aed8b2da3a9bc9cf927180f8c9d19e
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
=======

>>>>>>> 44a531d027aed8b2da3a9bc9cf927180f8c9d19e
const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
