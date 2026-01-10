import { Router } from "express";
import { CategoryController } from "./category.controller";
import { adminOnly } from "../../../middlewares/adminOnly";

const router = Router();

// ADMIN ONLY
router.post("/", CategoryController.createCategory);

// PUBLIC
router.get("/", CategoryController.getCategories);

export const CategoryRoutes = router;
