import Category from "../models/categorySchema.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    const err = error;
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to retrieve categories",
    });
  }
};

export { getAllCategories };
