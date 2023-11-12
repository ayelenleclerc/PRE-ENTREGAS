import mongoose from "mongoose";

const codeTicket = () => Date.now().toString(15);

const collection = "tickets";

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
    amount: {
      type: Number,
      required:true
    },
  },
  {
    timestamps: true,
  }
);


const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
