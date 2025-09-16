import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../../../application/use-case/CreateUserUseCase";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { prisma } from "../../../infrastructure/databases/prisma";

// Khởi tạo dependencies
const userRepository = new UserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

const userRoutes = Router();

// Route đăng ký user
userRoutes.post("/register", (req, res) => userController.createUser(req, res));

export default userRoutes;
