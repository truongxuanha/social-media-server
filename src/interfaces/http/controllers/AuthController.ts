import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { ICreateUserRequestDTO } from "@/domain/dtos/ICreateUserRequestDTO";
import MESSAGE from "@/shared/contants/message";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";
import { generateToken, generateRefreshToken } from "@/shared/utils/auth";
import { LoginUseCase } from "@/application/use-case/LoginUseCase";
import { BaseController } from "./BaseController";

export class AuthController extends BaseController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {
    super();
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData: ICreateUserRequestDTO = req.body;

      const result = await this.registerUseCase.execute(userData);

      const accessToken = generateToken(result.user.id);
      const refreshToken = generateRefreshToken(result.user.id);
      return this.created(res, {
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      Logger.error("Error in AuthController.register", error);
      if (error instanceof Error) {
        if (error.message === MESSAGE.AUTH.EMAIL_ALREADY_USED) {
          return res.status(422).json({
            message: MESSAGE.AUTH.EMAIL_ALREADY_USED,
            errors: [
              {
                field: "email",
                message: MESSAGE.AUTH.EMAIL_ALREADY_USED,
              },
            ],
          });
        }

        if (error.message === MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT) {
          return this.unprocessableEntity(res, {
            message: MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT,
            errors: [
              {
                field: "email",
                message: MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT,
              },
            ],
          });
        }
      }
      return this.serverError(res);
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    const userData: ICreateUserRequestDTO = req.body;
    try {
      const result = await this.loginUseCase.execute(userData);
      return this.success(res, {
        data: {
          accessToken: result?.data.accessToken,
          refreshToken: result?.data.refreshToken,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== MESSAGE.SERVER.INTERNAL_ERROR) {
          return this.unauthorized(res, MESSAGE.AUTH.INCORRECT_PASSWORD);
        }
      }
      return this.serverError(res);
    }
  }
}
