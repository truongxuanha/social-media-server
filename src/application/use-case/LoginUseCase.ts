import { IAuthRepository } from "../repositories/IAuthRepository";
import { User } from "../../domain/entities/user.entity";
import { ICreateUserRequestDTO } from "../../domain/dtos/ICreateUserRequestDTO";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import MESSAGE from "@/shared/contants/message";

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userData: ICreateUserRequestDTO): Promise<{
    data: {
      userInfo: User;
      token: string;
      refreshToken: string;
    };
    message: string;
  } | null> {
    const userInfo = await this.userRepository.findByEmail(userData.email);
    if (!userInfo) {
      throw new Error(MESSAGE.AUTH.INVALID_CREDENTIALS);
    }

    const hashedPassword = await bcrypt.compare(
      userData.password,
      userInfo.password
    );
    if (!hashedPassword) {
      throw new Error(MESSAGE.AUTH.INVALID_CREDENTIALS);
    }
    const user = new User({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      role: userInfo.role,
    });
    const tokenData = await this.authRepository.generateToken(user);
    if (!tokenData) {
      throw new Error(MESSAGE.AUTH.INVALID_CREDENTIALS);
    }
    const result = {
      userInfo: user,
      token: tokenData.token,
      refreshToken: tokenData.refreshToken,
    };
    if (!result) {
      throw new Error(MESSAGE.AUTH.INVALID_CREDENTIALS);
    }
    return {
      data: result,
      message: MESSAGE.AUTH.CREATE_SUCCESS,
    };
  }
}
