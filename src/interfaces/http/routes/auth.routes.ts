import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { AuthRepository } from "@/infrastructure/repositories/AuthRepository";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { prisma } from "@/infrastructure/databases/prisma";


const authRepository = new AuthRepository(prisma);
const userRepository = new UserRepository(prisma);
const registerUseCase = new RegisterUseCase(authRepository, userRepository);
const authController = new AuthController(registerUseCase);

const authRoutes = Router();

authRoutes.post("/register", (req, res) => authController.register(req, res));

export default authRoutes;
