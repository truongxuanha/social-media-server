import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { AuthRepository } from "@/infrastructure/repositories/AuthRepository";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ValiationMiddleware } from "../middlewares/validation.middlware";
import prisma from "@/infrastructure/databases/prisma";

const authRepository = new AuthRepository(prisma);
const userRepository = new UserRepository(prisma);
const registerUseCase = new RegisterUseCase(authRepository, userRepository);
const authController = new AuthController(registerUseCase);
const validationzMiddleware = new ValiationMiddleware();

const authRoutes = Router();

const bindValidateRequiredFields =
  validationzMiddleware.validateRequiredFields.bind(validationzMiddleware);

authRoutes.post(
  "/register",
  bindValidateRequiredFields(["name", "email", "password"]),
  authController.register.bind(authController)
);

export default authRoutes;
