import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { ICreateUserRequestDTO } from "@/domain/dtos/ICreateUserRequestDTO";
import { ILoginRequestDTO } from "@/domain/dtos/ILoginRequestDTO";
import MESSAGE from "@/shared/contants/message";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";
import { LoginUseCase } from "@/application/use-case/LoginUseCase";
import { BaseController } from "./BaseController";
import {
  AccountNotFoundException,
  IncorrectPasswordException,
  EmailAlreadyUsedException,
  InternalServerException,
  BaseException,
} from "@/domain/exceptions";

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

      return this.created(res, { data: result });
    } catch (error) {
      Logger.error("Error in AuthController.register", error);
      return this.handleRegisterError(error, res);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const userData: ILoginRequestDTO = req.body;
      const result = await this.loginUseCase.execute(userData);
      return this.success(res, { data: result });
    } catch (error) {
      Logger.error("Error in AuthController.login", error);
      return this.handleLoginError(error, res);
    }
  }

  private handleRegisterError(error: unknown, res: Response): Response {
    if (error instanceof EmailAlreadyUsedException) {
      return this.unprocessableEntity(res, {
        message: error.message,
        errors: [
          {
            field: "email",
            message: error.message,
          },
        ],
      });
    }

    if (error instanceof BaseException) {
      return this.serverError(res, error.message);
    }

    return this.serverError(res);
  }

  private handleLoginError(error: unknown, res: Response): Response {
    if (error instanceof AccountNotFoundException) {
      return this.unauthorized(res, error.message);
    }

    if (error instanceof IncorrectPasswordException) {
      return this.unauthorized(res, error.message);
    }

    if (error instanceof InternalServerException) {
      return this.serverError(res, error.message);
    }

    if (error instanceof BaseException) {
      return this.unauthorized(res, error.message);
    }

    return this.unauthorized(res, MESSAGE.AUTH.INVALID_CREDENTIALS);
  }
}
