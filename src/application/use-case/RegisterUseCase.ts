import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import { ICreateUserRequestDTO } from "../../domain/dtos/ICreateUserRequestDTO";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import MESSAGE from "@/shared/contants/message";

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository, private userRepository: IUserRepository,) {}

  async execute(
    userData: ICreateUserRequestDTO
  ): Promise<{ user: Omit<User, "password">; message: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error(MESSAGE.AUTH.EMAIL_ALREADY_USED);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = User.create({
      ...userData,
      password: hashedPassword,
    });

    const createdUser = await this.authRepository.register(user);

    const { password, ...userWithoutPassword } = createdUser;

    return {
      user: userWithoutPassword as Omit<User, "password">,
      message: MESSAGE.AUTH.CREATE_SUCCESS,
    };
  }
}
