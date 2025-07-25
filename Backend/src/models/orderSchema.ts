import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: { type: Number, required: true },
});

const ProductSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  deliveryDate: { type: Date, required: true },
  address: { type: String },
  item: { type: [ItemSchema], required: true },
  status: {
    type: String,
    enum: [
      "order Placed",
      "Shipping",
      "Out for Delivery",
      "Delivery",
      "Cancelled",
    ],
    default: "Order Placed",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", ProductSchema);

export default Order;
