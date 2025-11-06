import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../repositories/IUserRepository";
import { ILoginRequestDTO } from "@/domain/dtos/ILoginRequestDTO";
import {
  AccountNotFoundException,
  IncorrectPasswordException,
  InternalServerException,
} from "@/domain/exceptions";
import { LoginResponse } from "@/domain/dtos/ILoginResponseDTO";

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ILoginRequestDTO): Promise<LoginResponse> {
    const user = await this.validateUserCredentials(userData);
    const tokenData = await this.generateUserTokens(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email.address,
      },
      accessToken: tokenData.token,
      refreshToken: tokenData.refreshToken,
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

    return new User(userInfo);
  }

  private async generateUserTokens(user: User) {
    const tokenData = await this.authRepository.generateToken(user);
    if (!tokenData) {
      throw new InternalServerException();
    }
    return tokenData;
  }
}
