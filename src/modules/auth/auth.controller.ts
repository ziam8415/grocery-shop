import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { catchAsync } from "../../utils/asyncHandler"; // ✅ adjust path

// Signup
const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// Signin
const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authServices.loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

// Logout
const logout = catchAsync(async (_req: Request, res: Response) => {
  const result = await authServices.logoutUser();

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Request password reset
const requestPasswordReset = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = await authServices.forgotPassword(email);

  // For testing, log token (in production, send via email)
  console.log(`Reset link: https://yourapp.com/reset-password?token=${token}`);

  res.status(200).json({
    success: true,
    message: "Password reset token sent",
    token, // return token for dev/testing
  });
});

// Reset password
const resetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    const result = await authServices.resetPassword(token, newPassword);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  },
);

export const authController = {
  signup,
  signin,
  logout,
  requestPasswordReset,
  resetPasswordController,
};
