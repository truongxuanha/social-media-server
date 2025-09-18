import { IUserRepository } from "../repositories/IUserRepository";

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      id: string;
      name: string;
      email: string;
      createdAt: Date;
    };
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
      data: {
        id: user.id,
        name: user.name,
        email: user.email.address,
        createdAt: user.createdAt,
      },
    };
  }
}
