import express from "express";

import {
  createOrder,
  createTransaction,
  getOrdersByUserId,
} from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);
router.post("/transaction", createTransaction);
router.get("/:userId", getOrdersByUserId);
export default router;
