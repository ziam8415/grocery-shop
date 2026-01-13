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

//get category by slug
const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const result = await CategoryService.getCategoryBySlug(slug);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error,
    });
  }
};

//update category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { userId, name, slug, parentId } = req.body;
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update category",
      });
    }

    const result = await CategoryService.updateCategory(id, {
      name,
      slug,
      parentId,
    });

    res.status(200).json({
      success: true,
      message: "Category updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error,
    });
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const category = await CategoryService.getProductsByCategorySlug(slug);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};

//delete category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete category",
      });
    }

    await CategoryService.deleteCategoryWithRelations(id);

    res.status(200).json({
      success: true,
      message: "Category, sub-categories and products deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error,
    });
  }
};

export const CategoryController = {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  getProductsByCategory,
  deleteCategory,
};
