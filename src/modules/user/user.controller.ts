// modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "./user.service";

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

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
