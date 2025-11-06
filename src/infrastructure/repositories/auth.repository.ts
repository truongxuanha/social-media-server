import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { generateRefreshToken, generateToken } from "@/shared/utils/auth";

export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaClient) {}

  async register(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return new User({
      id: createdUser.id,
      name: createdUser.name,
      email: new Email({ address: createdUser.email }),
      password: createdUser.password,
      createdAt: createdUser.createdAt ?? new Date(),
      updatedAt: null,
    });
  }
  async generateToken(
    user: User
  ): Promise<{ token: string; refreshToken: string } | null> {
    return {
      token: generateToken(user),
      refreshToken: generateRefreshToken(user.id),
    };
  }
}
