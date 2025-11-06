import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { User } from "../../domain/entities/user.entity";
import {
  ICreateUserRequestDTO,
  IUserSerialized,
} from "../../domain/dtos/create-user-request.dto";
import { IUserRepository } from "../../domain/repositories/user.repository";
import {
  EmailAlreadyUsedException,
  InternalServerException,
} from "@/domain/exceptions";

export class RegisterUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ICreateUserRequestDTO): Promise<{
    user: IUserSerialized;
    refreshToken: string;
    accessToken: string;
  }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new EmailAlreadyUsedException();
    }
    const user = await User.create(userData);

    const createdUser = await this.authRepository.register(user);
    const tokenData = await this.generateUserTokens(createdUser);
    return {
      user: createdUser.toJSON(),
      refreshToken: tokenData.refreshToken,
      accessToken: tokenData.token,
    };
  }
  private async generateUserTokens(user: User) {
    const tokenData = await this.authRepository.generateToken(user);

    if (!tokenData) {
      throw new InternalServerException();
    }
    return tokenData;
  }
}
