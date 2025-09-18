import { GetUserInfoUseCase } from "@/application/use-case/GetUserInfoUseCase";
import { Request, Response } from "express";

export class UserController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) {}

  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: "error:user:required_id",
        });
        return;
      }

      const result = await this.getUserInfoUseCase.execute(userId);

      if (!result.success) {
        res.status(404).json({
          success: false,
          message: result.message,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      res.status(500).json({
        success: false,
        message: "error:server",
      });
    }
  }
}
