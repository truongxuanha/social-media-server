import { GetUserInfoUseCase } from "@/application/use-case/get-user-info.usecase";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {
    super();
  }

  async getUserInfo(req: Request, res: Response, next: any): Promise<Response> {
    try {
      const user = (req as any).user;
      if (!user || !user.id) {
        return this.unauthorized(res);
      }
      const result = await this.getUserInfoUseCase.execute(user.id);
      return this.success(res, { data: result });
    } catch (error) {
      return next(error);
    }
  }
}
