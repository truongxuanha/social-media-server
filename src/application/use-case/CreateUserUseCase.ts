import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../domain/entities/user.entity";
import { ICreateUserRequestDTO } from "../../domain/dtos/ICreateUserRequestDTO";
import bcrypt from "bcryptjs";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userData: ICreateUserRequestDTO
  ): Promise<{ user: Omit<User, "password">; message: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email đã được sử dụng");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = User.create({
      ...userData,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.create(user);

    const { password, ...userWithoutPassword } = createdUser;

    return {
      user: userWithoutPassword as Omit<User, "password">,
      message: "Đăng ký thành công",
    };
  }
}
