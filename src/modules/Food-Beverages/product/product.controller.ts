import { Request, Response } from "express";
import * as productService from "./product.service";
import { CreateProductInput } from "./product.types";

export async function createProduct(
  req: Request<{}, {}, CreateProductInput>,
  res: Response
) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product creation failed" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
