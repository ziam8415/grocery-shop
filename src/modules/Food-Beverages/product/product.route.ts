import { Router } from "express";
import * as productController from "./product.controller";

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

export const ProductRoutes = router;
