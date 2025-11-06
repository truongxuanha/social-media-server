import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserSerialized } from "@/domain/interfaces/user.interface";

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<{
    success: boolean;
    message: string;
    data?: IUserSerialized;
  }> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return {
        success: false,
        message: "Không tìm thấy người dùng",
      };
    }

    return {
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: user.toJSON(),
    };
  }
}
