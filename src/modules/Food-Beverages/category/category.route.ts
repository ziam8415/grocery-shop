import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

// ADMIN ONLY
router.post("/", CategoryController.createCategory);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

// PUBLIC
router.get("/", CategoryController.getCategories);
router.get("/:slug", CategoryController.getCategoryBySlug);
router.get("/:slug/products", CategoryController.getProductsByCategory);

export const CategoryRoutes = router;
