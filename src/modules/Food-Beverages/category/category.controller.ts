import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error,
    });
  }
};

const getCategories = async (_req: Request, res: Response) => {
  try {
    const result = await CategoryService.getCategoriesWithSub();

    res.status(200).json({
      success: true,
      message: "Categories fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error,
    });
  }
};

export const CategoryController = {
  createCategory,
  getCategories,
};
