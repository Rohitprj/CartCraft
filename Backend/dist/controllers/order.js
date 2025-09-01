"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserId = exports.createTransaction = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const transactionSchema_1 = __importDefault(require("../models/transactionSchema"));
const orderSchema_1 = __importDefault(require("../models/orderSchema"));
const userSchems_1 = __importDefault(require("../models/userSchems"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, userId } = req.body;
    const razorpay = new razorpay_1.default({
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
        const razorpayOrder = yield razorpay.orders.create(option);
        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            key: process.env.RAZOR_PAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Failed to create order",
        });
    }
});
exports.createTransaction = createTransaction;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, cartItems, deliveryDate, address, } = req.body;
    const key_secret = process.env.RAZOR_PAY_SECRET;
    if (!key_secret) {
        return res
            .status(500)
            .json({ success: false, message: "Razorpay secret key not configured" });
    }
    const generated_signature = crypto_1.default
        .createHmac("sha256", key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");
    if (generated_signature === razorpay_signature) {
        try {
            const transaction = yield transactionSchema_1.default.create({
                user: userId,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: "Success",
                amount: cartItems.reduce((total, item) => total + (item === null || item === void 0 ? void 0 : item.quantity) * item.price, 0),
            });
            const order = yield orderSchema_1.default.create({
                user: userId,
                deliveryDate,
                address,
                item: cartItems === null || cartItems === void 0 ? void 0 : cartItems.map((item) => ({
                    product: item === null || item === void 0 ? void 0 : item._id,
                    quantity: item === null || item === void 0 ? void 0 : item.quantity,
                })),
                status: "Order Placed",
            });
            transaction.order = order._id;
            yield transaction.save();
            res.status(200).json({
                success: true,
                message: "Payment verified and order created successfully",
                order,
            });
        }
        catch (error) {
            const err = error;
            res.status(500).json({
                status: "failed",
                message: "Failed to create transaction or order",
                error: err.message,
            });
        }
    }
});
exports.createOrder = createOrder;
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield userSchems_1.default.find({ user: userId })
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            status: "failed",
            message: "Failed to retrieve order",
            error: err.message,
        });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
