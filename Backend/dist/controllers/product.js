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
exports.getProductsByCategoryId = void 0;
const productSchema_1 = __importDefault(require("../models/productSchema"));
const getProductsByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const products = yield productSchema_1.default.find({ category: categoryId });
        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "No products found for this category",
            });
        }
        res.status(200).json({ success: true, products });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Failed to retrieve categories",
        });
    }
});
exports.getProductsByCategoryId = getProductsByCategoryId;
