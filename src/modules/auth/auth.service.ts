import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";
import config from "../../config";

const registerUser = async (payload: any) => {
  const { name, email, password, roleName } = payload;

  if (!email || !password || !roleName) {
    throw new Error("Missing required fields");
  }

  // 1️⃣ Find role by name
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new Error("Invalid role");
  }

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Create user with roleId
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: {
        select: { name: true },
      },
    },
  });

  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // ✅ JWT contains role name
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role.name,
    },
    config.jwt_secret as string,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role.name,
    },
  };
};

const logoutUser = async () => {
  return {
    message: "Logged out successfully",
  };
};

/**
 * Generate stateless password reset token
 */
const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const token = jwt.sign(
    { userId: user.id },
    config.jwt_secret as string,
    { expiresIn: "30m" }, // short expiry
  );

  // Return token to send via email
  return token;
};

/**
 * Reset password using stateless JWT
 */
const resetPassword = async (token: string, newPassword: string) => {
  try {
    const decoded: any = jwt.verify(token, config.jwt_secret as string);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    return { message: "Password updated successfully" };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export const authServices = {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
};
