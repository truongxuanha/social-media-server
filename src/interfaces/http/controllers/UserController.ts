import { GetUserInfoUseCase } from "@/application/use-case/GetUserInfoUseCase";
import { Request, Response } from "express";
import Logger from "@/interfaces/http/logger/logger";

export class UserController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {}

  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!userId) {
        res.status(422).json({
          message: "error:user:required_id",
          errors: [
            {
              field: "id",
              message: "error:user:required_id",
            },
          ],
        });
        return;
      }

      const result = await this.getUserInfoUseCase.execute(userId);

      if (!result.success) {
        res.status(404).json({
          message: result.message,
        });
        return;
      }

      res.status(200).json({
        data: result.data,
      });
    } catch (_error) {
      Logger.error("Error in UserController.getUserInfo", _error);
      res.status(500).json({
        message: "error:server",
      });
    }
  }
}
