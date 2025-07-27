// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import connectDB from "./config/connect";
// import Product from "./models/productSchema";
// import Category from "./models/categorySchema";
// import { categoriesData, productData } from "./seedData";

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

import dotenv from "dotenv";
import mongoose, { Types } from "mongoose";
import connectDB from "./config/connect.js";
import Product from "./models/productSchema.js";
import Category from "./models/categorySchema.js";
import { categoriesData, productData } from "./seedData.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGODB_URL || "");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    const categoryDocs = await Category.insertMany(categoriesData);

    // Create a map: category name => category ID
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Add category ID to each product
    const productWithCategoryIds = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    // Insert updated products
    await Product.insertMany(productWithCategoryIds);

    console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
