  import { RegisterUseCase } from "@/application/use-case/RegisterUseCase";
import { ICreateUserRequestDTO } from "@/domain/dtos/ICreateUserRequestDTO";
import MESSAGE from "@/shared/contants/message";
import { Request, Response } from "express";

export class AuthController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICreateUserRequestDTO = req.body;
      if (!userData.name || !userData.email || !userData.password) {
        res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp đầy đủ thông tin: name, email, password",
        });
        return;
      }

      if (userData.password.length < 6) {
        res.status(400).json({
          success: false,
          message: "error:password_length_min",
        });
        return;
      }

      const result = await this.registerUseCase.execute(userData);

      res.status(201).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === MESSAGE.AUTH.EMAIL_ALREADY_USED) {
          res.status(409).json({
            success: false,
            message: MESSAGE.AUTH.EMAIL_ALREADY_USED,
          });
          return;
        }

        if (error.message === MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT) {
          res.status(400).json({
            success: false,
            message: MESSAGE.VALIDATION.INVALID_EMAIL_FORMAT,
          });
          return;
        }
      }

      res.status(500).json({
        success: false,
        message: "error:server",
      });
    }
  }
}
