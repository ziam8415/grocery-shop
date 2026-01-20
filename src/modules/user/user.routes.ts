// modules/user/user.routes.ts
import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
//router.put("/:id", UserController.updateUser);

export const UserRoutes = router;
