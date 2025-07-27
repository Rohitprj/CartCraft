import Razorpay from "razorpay";
import crypto from "crypto";
import Transaction from "../models/transactionSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchems.js";

const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  const option = {
    amount: amount,
    currency: "INR",
    receipt: `receipt#${Date.now()}`,
  };

  try {
    if (!amount || !userId) {
      res.status(400).json({
        status: false,
        message: "Amount and userId required",
      });
    }
    const razorpayOrder = await razorpay.orders.create(option);

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      key: process.env.RAZOR_PAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
    });
  } catch (error) {
    const err = error;
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to create order",
    });
  }
};

const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZOR_PAY_SECRET;

  if (!key_secret) {
    return res
      .status(500)
      .json({ success: false, message: "Razorpay secret key not configured" });
  }

  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const transaction = await Transaction.create({
        user: userId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Success",
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0
        ),
      });

      const order = await Order.create({
        user: userId,
        deliveryDate,
        address,
        item: cartItems?.map((item) => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: "Order Placed",
      });

      transaction.order = order._id;
      await transaction.save();
      res.status(200).json({
        success: true,
        message: "Payment verified and order created successfully",
        order,
      });
    } catch (error) {
      const err = error;
      res.status(500).json({
        status: "failed",
        message: "Failed to create transaction or order",
        error: err.message,
      });
    }
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await User.find({ user: userId })
      .populate("user", "name email")
      .populate("items.product", "name price image_uri ar_uri")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      res.status(404).json({
        success: false,
        message: "No order found for this user",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    const err = error;
    res.status(500).json({
      status: "failed",
      message: "Failed to retrieve order",
      error: err.message,
    });
  }
};

export { createOrder, createTransaction, getOrdersByUserId };
