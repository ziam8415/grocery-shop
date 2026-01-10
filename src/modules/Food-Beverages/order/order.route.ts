import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrder);
router.put("/:id/status", OrderController.updateOrderStatus);

export const OrderRoutes = router;
