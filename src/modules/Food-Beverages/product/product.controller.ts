import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};

const getProductsBySubCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const result = await ProductService.getProductsBySubCategory(categoryId);

    res.status(200).json({
      success: true,
      message: "Products fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductById(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not delete",
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductsBySubCategory,
  getProductById,
  deleteProduct,
};
