import express from "express";

import {
  createOrder,
  createTransaction,
  getOrdersByUserId,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/transaction", createTransaction);
router.post("/:userId", getOrdersByUserId);
export default router;
