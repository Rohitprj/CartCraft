import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connect";
import Product from "./models/productSchema";
import Category from "./models/categorySchema";
import { categoriesData, productData } from "./seedData";

dotenv.config();

const seedDatabase = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    await Product.deleteMany({});
    await Category.deleteMany({});
    const categoryDocs = await Category.insertMany(categoriesData);
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    });

    const productWithCategoryIds = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productWithCategoryIds);

    console.log("DATABASE SEEDED SUCCESSFULLY !");
  } catch (error) {
    console.error("Error Seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};
seedDatabase();
