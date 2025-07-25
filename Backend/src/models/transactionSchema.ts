import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  status: {
    type: String,
    enum: ["Success", "Failed", "Pending"],
    required: true,
  },
  amount:{type:Number,required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
