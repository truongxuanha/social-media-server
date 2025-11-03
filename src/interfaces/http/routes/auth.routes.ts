import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { AuthRepository } from "@/infrastructure/repositories/AuthRepository";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ValiationMiddleware } from "../middlewares/validation.middlware";
import { registerSchema } from "@/shared/validations";
import prisma from "@/infrastructure/databases/prisma";

const authRepository = new AuthRepository(prisma);
const userRepository = new UserRepository(prisma);
const registerUseCase = new RegisterUseCase(authRepository, userRepository);
const authController = new AuthController(registerUseCase);
const validationMiddleware = new ValiationMiddleware();

const authRoutes = Router();

authRoutes.post(
  "/register",
  validationMiddleware.validate(registerSchema),
  authController.register.bind(authController)
);

export default authRoutes;
