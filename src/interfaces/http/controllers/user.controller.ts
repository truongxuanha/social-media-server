import { GetUserInfoUseCase } from "@/application/use-case/get-user-info.usecase";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {
    super();
  }

  async getUserInfo(req: Request, res: Response): Promise<Response> {
    try {
      const user = (req as any).user;
      if (!user || !user.id) {
        return this.unauthorized(res);
      }

      const result = await this.getUserInfoUseCase.execute(user.id);
      if (!result.success) {
        return this.notFound(res, result.message);
      }

      return this.success(res, { data: result.data });
    } catch (error) {
      Logger.error("Error in UserController.getUserInfo", error);
      return this.serverError(res);
    }
  }
}
