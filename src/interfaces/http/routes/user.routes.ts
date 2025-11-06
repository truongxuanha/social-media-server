import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { GetUserInfoUseCase } from "../../../application/use-case/get-user-info.usecase";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import prisma from "@/infrastructure/databases/prisma";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const userRepository = new UserRepository(prisma);
const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);
const userController = new UserController(getUserInfoUseCase);
const authMiddleware = new AuthMiddleware();
const userRoutes = Router();

userRoutes.get(
  "/info",
  authMiddleware.verifyToken.bind(authMiddleware),
  userController.getUserInfo.bind(userController)
);

export default userRoutes;
