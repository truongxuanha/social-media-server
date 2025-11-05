import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GetUserInfoUseCase } from "../../../application/use-case/GetUserInfoUseCase";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import prisma from "@/infrastructure/databases/prisma";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const userRepository = new UserRepository(prisma);
const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);
const userController = new UserController(getUserInfoUseCase);
const authMiddleware = new AuthMiddleware();
const userRoutes = Router();

userRoutes.get(
  "/:id",
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.getUserInfo.bind(userController)
);

export default userRoutes;
