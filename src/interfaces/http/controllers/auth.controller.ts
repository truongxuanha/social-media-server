import { RegisterUseCase } from "@/application/use-case/register.usecase";
import { ICreateUserRequestDTO } from "@/domain/dtos/create-user-request.dto";
import { ILoginRequestDTO } from "@/domain/dtos/login-request.dto";
import { Request, Response } from "express";
import { LoginUseCase } from "@/application/use-case/login.usecase";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {
    super();
  }

  async register(
    req: Request,
    res: Response,
    next: any
  ): Promise<Response | Error> {
    const userData: ICreateUserRequestDTO = req.body;
    try {
      const result = await this.registerUseCase.execute(userData);
      return this.created(res, result);
    } catch (error) {
      return next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: any
  ): Promise<Response | Error> {
    const userData: ILoginRequestDTO = req.body;
    try {
      const result = await this.loginUseCase.execute(userData);
      return this.success(res, result);
    } catch (error) {
      return next(error);
    }
  }
}
