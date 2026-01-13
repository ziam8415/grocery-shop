import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  res.status(201).json(product);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts(req.query);
  res.json(products);
};

const getSingleProduct = async (req: Request, res: Response) => {
  const product = await ProductService.getSingleProduct(req.params.id);
  res.json(product);
};

const updateProduct = async (req: Request, res: Response) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  res.json(product);
};

const deleteProduct = async (req: Request, res: Response) => {
  await ProductService.deleteProduct(req.params.id);
  res.json({ success: true, message: "Product deleted" });
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
