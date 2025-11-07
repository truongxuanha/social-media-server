import { RegisterUseCase } from "@/application/use-case/register.usecase";
import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ValiationMiddleware } from "../middlewares/validation.middlware";
import { registerSchema, loginSchema } from "@/shared/validations";
import prisma from "@/infrastructure/databases/prisma";
import { LoginUseCase } from "@/application/use-case/login.usecase";

const authRepository = new AuthRepository(prisma);
const userRepository = new UserRepository(prisma);
const registerUseCase = new RegisterUseCase(authRepository, userRepository);
const loginUseCase = new LoginUseCase(authRepository, userRepository);
const authController = new AuthController(registerUseCase, loginUseCase);
const validationMiddleware = new ValiationMiddleware();

const authRoutes = Router();

authRoutes.post(
  "/register",
  validationMiddleware.validate(registerSchema),
  authController.register.bind(authController)
);
authRoutes.post(
  "/login",
  validationMiddleware.validate(loginSchema),
  authController.login.bind(authController)
);
export default authRoutes;
