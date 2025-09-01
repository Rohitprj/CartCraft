"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.get("/:categoryId", product_1.getProductsByCategoryId);
exports.default = router;
