import { Request, Response } from "express";
import Product from "../models/productSchema";

const getProductsByCategoryId = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId });
    if (!products || products.length === 0) {
      res.status(404).json({
        success: false,
        message: "No products found for this category",
      });
    }
    res.status(200).json({ success: true, products });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to retrieve categories",
    });
  }
};

export { getProductsByCategoryId };
