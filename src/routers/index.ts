import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/Food-Beverages/category/category.route";
import { ProductRouter } from "../modules/Food-Beverages/product/product.route";
import { OrderRoutes } from "../modules/Food-Beverages/order/order.route";

const router = Router();

router.use("/users", UserRoutes);
// router.use("/vendors", VendorRoutes);
router.use("/categories", CategoryRoutes);
router.use("/products", ProductRouter);
router.use("/orders", OrderRoutes);

export default router;
