import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { ILoginRequestDTO } from "@/domain/dtos/login-request.dto";
import { LoginResponse } from "@/domain/dtos/login-response-dto";
import {
  AccountNotFoundException,
  IncorrectPasswordException,
  InternalServerException,
} from "@/domain/exceptions";

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ILoginRequestDTO): Promise<LoginResponse> {
    const user = await this.validateUserCredentials(userData);
    const tokenData = await this.generateUserTokens(user);

    return {
      data: {
        user: user.toJSON(),
        accessToken: tokenData.token,
        refreshToken: tokenData.refreshToken,
      },
    };
  }

  private async validateUserCredentials(
    userData: ILoginRequestDTO
  ): Promise<User> {
    const userInfo = await this.userRepository.findByEmail(userData.email);
    if (!userInfo) {
      throw new AccountNotFoundException();
    }

    const isPasswordValid = await User.isValidPassword(
      userData.password,
      userInfo.password
    );

    if (!isPasswordValid) {
      throw new IncorrectPasswordException();
    }

    return userInfo;
  }

  private async generateUserTokens(user: User) {
    const tokenData = await this.authRepository.generateToken(user);
    if (!tokenData) {
      throw new InternalServerException();
    }
    return tokenData;
  }
}
