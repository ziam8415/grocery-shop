import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authServices.loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

const logout = async (_req: Request, res: Response) => {
  const result = await authServices.logoutUser();

  return res.status(200).json({
    success: true,
    message: result.message,
  });
};

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = await authServices.forgotPassword(email);

  // Send token via email (or return for testing)
  console.log(`Reset link: https://yourapp.com/reset-password?token=${token}`);

  res.status(200).json({
    success: true,
    message: "Password reset token sent",
    token,
  });
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const result = await authServices.resetPassword(token, newPassword);

  res.status(200).json({
    success: true,
    message: result.message,
  });
};

export const authController = {
  signup,
  signin,
  logout,
  requestPasswordReset,
  resetPasswordController,
};
