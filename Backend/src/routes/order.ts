import express from "express";

import { createOrder, createTransaction } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);
router.post("/", createTransaction);
export default router;
