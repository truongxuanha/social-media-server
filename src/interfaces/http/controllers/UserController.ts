import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/use-case/CreateUserUseCase";
import { ICreateUserRequestDTO } from "../../../domain/dtos/ICreateUserRequestDTO";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICreateUserRequestDTO = req.body;
      console.log(userData);
      // Validation cơ bản
      if (!userData.name || !userData.email || !userData.password) {
        res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp đầy đủ thông tin: name, email, password",
        });
        return;
      }

      // Kiểm tra độ dài password
      if (userData.password.length < 6) {
        res.status(400).json({
          success: false,
          message: "Mật khẩu phải có ít nhất 6 ký tự",
        });
        return;
      }

      const result = await this.createUserUseCase.execute(userData);

      res.status(201).json({
        success: true,
        message: result.message,
        data: {
          user: {
            name: result.user.name,
            email: result.user.email,
          },
        },
      });
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);

      if (error instanceof Error) {
        if (error.message === "Email đã được sử dụng") {
          res.status(409).json({
            success: false,
            message: error.message,
          });
          return;
        }

        if (error.message === "Invalid email format") {
          res.status(400).json({
            success: false,
            message: "Định dạng email không hợp lệ",
          });
          return;
        }
      }

      res.status(500).json({
        success: false,
        message: "Lỗi server nội bộ",
      });
    }
  }
}
