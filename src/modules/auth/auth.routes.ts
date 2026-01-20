// auth.routes.ts

import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

/**
 * Passport authenticates the token
 * If token is valid → logout succeeds
 */
router.post("/logout", authenticate, authController.logout);

//password reset
router.post("/forgot-password", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPasswordController);

export const authRoute = router;
