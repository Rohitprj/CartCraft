"use strict";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import connectDB from "./config/connect";
// import Product from "./models/productSchema";
// import Category from "./models/categorySchema";
// import { categoriesData, productData } from "./seedData";
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
// dotenv.config();
// const seedDatabase = async () => {
//   try {
//     await connectDB(process.env.MONGODB_URL);
//     await Product.deleteMany({});
//     await Category.deleteMany({});
//     const categoryDocs = await Category.insertMany(categoriesData);
//     const categoryMap = categoryDocs.reduce((map, category) => {
//       map[category.name] = category._id;
//       return map;
//     });
//     const productWithCategoryIds = productData.map((product) => ({
//       ...product,
//       category: categoryMap[product.category],
//     }));
//     await Product.insertMany(productWithCategoryIds);
//     console.log("DATABASE SEEDED SUCCESSFULLY !");
//   } catch (error) {
//     console.error("Error Seeding database:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };
// seedDatabase();
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_1 = __importDefault(require("./config/connect"));
const productSchema_1 = __importDefault(require("./models/productSchema"));
const categorySchema_1 = __importDefault(require("./models/categorySchema"));
const seedData_1 = require("./seedData");
dotenv_1.default.config();
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield (0, connect_1.default)(process.env.MONGODB_URL || "");
        // Clear existing data
        yield productSchema_1.default.deleteMany({});
        yield categorySchema_1.default.deleteMany({});
        // Insert categories
        const categoryDocs = yield categorySchema_1.default.insertMany(seedData_1.categoriesData);
        // Create a map: category name => category ID
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});
        // Add category ID to each product
        const productWithCategoryIds = seedData_1.productData.map((product) => (Object.assign(Object.assign({}, product), { category: categoryMap[product.category] })));
        // Insert updated products
        yield productSchema_1.default.insertMany(productWithCategoryIds);
        console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
seedDatabase();
