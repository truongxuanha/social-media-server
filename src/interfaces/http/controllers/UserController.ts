import { GetUserInfoUseCase } from "@/application/use-case/GetUserInfoUseCase";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";
import { BaseController } from "./BaseController";
import MESSAGE from "@/shared/contants/message";

export class UserController extends BaseController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {
    super();
  }

  async getUserInfo(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;

      if (!userId) {
        return this.handleValidationError(res);
      }

      const result = await this.getUserInfoUseCase.execute(userId);

      if (!result.success) {
        return this.notFound(res, result.message);
      }

      return this.success(res, { data: result.data });
    } catch (error) {
      Logger.error("Error in UserController.getUserInfo", error);
      return this.serverError(res);
    }
  }

  private handleValidationError(res: Response): Response {
    return this.unprocessableEntity(res, {
      errors: [
        {
          field: "id",
          message: MESSAGE.USER.REQUIRED_ID,
        },
      ],
    });
  }
}
