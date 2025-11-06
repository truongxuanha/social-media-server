import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import {
  ICreateUserRequestDTO,
  IUserResponseDTO,
} from "../../domain/dtos/ICreateUserRequestDTO";
import { IUserRepository } from "../repositories/IUserRepository";
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
    user: IUserResponseDTO;
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
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email.address,
      },
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
