// modules/user/user.service.ts
import { prisma } from "../../utils/prisma";
import { Role } from "@prisma/client";

const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role ?? Role.CUSTOMER,
    },
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
};
