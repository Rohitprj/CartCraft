import { Request, Response } from "express";
import Category from "../models/categorySchema";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to retrieve categories",
    });
  }
};

export { getAllCategories };
