// modules/user/user.controller.ts
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/asyncHandler";

const createUser = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  res.json(user);
};

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  res.json(user);
};

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserService.updateUser(id, updateData);
    res.status(200).json(updatedUser);
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
