import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { prisma } from "../../../infrastructure/databases/prisma";
import { GetUserInfoUseCase } from "../../../application/use-case/GetUserInfoUseCase";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";

const userRepository = new UserRepository(prisma);
const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);
const userController = new UserController(getUserInfoUseCase);
const userRoutes = Router();

userRoutes.get("/:id", userController.getUserInfo);

export default userRoutes;
