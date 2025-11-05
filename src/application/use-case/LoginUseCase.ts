import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../repositories/IUserRepository";
import MESSAGE from "@/shared/contants/message";
import {
  ICreateUserRequestDTO,
  IUserResponseDTO,
} from "@/domain/dtos/ICreateUserRequestDTO";
import { LoginResponse } from "@/domain/dtos/ILoginResponseDTO";

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ICreateUserRequestDTO): Promise<LoginResponse> {
    const user = await this.validateUserCredentials(userData);
    const tokenData = await this.generateUserTokens(user);

    return {
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email.address,
          role: user.role,
        },
        accessToken: tokenData.token,
        refreshToken: tokenData.refreshToken,
      },
    };
  }

  private async validateUserCredentials(
    userData: ICreateUserRequestDTO
  ): Promise<User> {
    const userInfo = await this.userRepository.findByEmail(userData.email);
    if (!userInfo) {
      throw new Error(MESSAGE.AUTH.ACCOUNT_NOT_EXIST);
    }

    const isPasswordValid = await User.isValidPassword(
      userData.password,
      userInfo.password
    );

    if (!isPasswordValid) {
      throw new Error(MESSAGE.AUTH.INCORRECT_PASSWORD);
    }

    return new User(userInfo);
  }

  private async generateUserTokens(user: User) {
    const tokenData = await this.authRepository.generateToken(user);
    if (!tokenData) {
      throw new Error(MESSAGE.SERVER.INTERNAL_ERROR);
    }
    return tokenData;
  }
}
