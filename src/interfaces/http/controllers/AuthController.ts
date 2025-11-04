import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { ICreateUserRequestDTO } from "@/domain/dtos/ICreateUserRequestDTO";
import MESSAGE from "@/shared/contants/message";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";
import { generateToken, generateRefreshToken } from "@/shared/utils/auth";
import { LoginUseCase } from "@/application/use-case/LoginUseCase";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICreateUserRequestDTO = req.body;

      const result = await this.registerUseCase.execute(userData);

      const accessToken = generateToken(result.user.id);
      const refreshToken = generateRefreshToken(result.user.id);

      res.status(201).json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      Logger.error("Error in AuthController.register", error);
      if (error instanceof Error) {
        if (error.message === MESSAGE.AUTH.EMAIL_ALREADY_USED) {
          res.status(422).json({
            message: MESSAGE.AUTH.EMAIL_ALREADY_USED,
            errors: [
              {
                field: "email",
                message: MESSAGE.AUTH.EMAIL_ALREADY_USED,
              },
            ],
          });
          return;
        }

        if (error.message === MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT) {
          res.status(422).json({
            message: MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT,
            errors: [
              {
                field: "email",
                message: MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT,
              },
            ],
          });
          return;
        }
      }

      res.status(500).json({
        message: MESSAGE.SERVER.INTERNAL_ERROR,
      });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    const userData: ICreateUserRequestDTO = req.body;

    const result = await this.loginUseCase.execute(userData);
    res.status(200).json({
      data: {
        accessToken: result?.data.token,
        refreshToken: result?.data.refreshToken,
      },
    });
  }
}
