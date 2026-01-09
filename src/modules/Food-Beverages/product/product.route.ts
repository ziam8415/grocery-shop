import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get(
  "/subcategory/:categoryId",
  ProductController.getProductsBySubCategory
);
router.get("/:productId", ProductController.getProductById);
router.delete("/:productId", ProductController.deleteProduct);

export const ProductRouter = router;
