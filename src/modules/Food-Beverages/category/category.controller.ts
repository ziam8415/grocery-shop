import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { prisma } from "../../../utils/prisma"; // make sure prisma is imported

const createCategory = async (req: Request, res: Response) => {
  try {
    const { userId, name, slug, parentId } = req.body;

    // 1️⃣ Check if user exists and is ADMIN
    const user = await prisma.user.findUnique({ where: { id: userId } });
    console.log(user);
    if (!user || user.role.toUpperCase() !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin  users can create categories",
      });
    }

    // 2️⃣ Create category
    const result = await CategoryService.createCategory({
      name,
      slug,
      parentId,
    });

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
