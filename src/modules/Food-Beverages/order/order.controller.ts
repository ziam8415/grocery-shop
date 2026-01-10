import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body;

  const result = await OrderService.createOrder(userId, items);

  res.status(201).json({
    success: true,
    data: result,
  });
};

const getOrders = async (_req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  res.status(200).json({
    success: true,
    data: result,
  });
};

const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OrderService.getOrderById(id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await OrderService.updateOrderStatus(id, status);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
