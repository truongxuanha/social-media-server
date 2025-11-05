import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import {
  ICreateUserRequestDTO,
  IUserResponseDTO,
} from "../../domain/dtos/ICreateUserRequestDTO";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import MESSAGE from "@/shared/contants/message";

export class RegisterUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ICreateUserRequestDTO): Promise<{
    user: IUserResponseDTO;
    refreshToken: string;
    accessToken: string;
  }> {
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
    const tokenData = await this.generateUserTokens(createdUser);
    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email.address,
        role: createdUser.role,
      },
      refreshToken: tokenData.refreshToken,
      accessToken: tokenData.token,
    };
  }
  private async generateUserTokens(user: User) {
    const tokenData = await this.authRepository.generateToken(user);

    if (!tokenData) {
      throw new Error(MESSAGE.SERVER.INTERNAL_ERROR);
    }
    return tokenData;
  }
}
