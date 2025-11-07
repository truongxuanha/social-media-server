import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { IAuthRepository } from "@/domain/repositories/auth.repository";
import { generateRefreshToken, generateToken } from "@/shared/utils/auth";
import { BaseRepository } from "./base.repository";

interface UserFilter {
  email?: string;
  name?: string;
}

export class AuthRepository
  extends BaseRepository<User, UserFilter>
  implements IAuthRepository
{
  constructor(private prisma: PrismaClient) {
    super(prisma.user as any, "id");
  }

  private mapToEntity(prismaUser: any): User {
    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      email: new Email({ address: prismaUser.email }),
      password: prismaUser.password,
      createdAt: prismaUser.createdAt ?? new Date(),
      updatedAt: prismaUser.updatedAt,
    });
  }

  async register(user: User): Promise<User> {
    const createdUser = await super.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return this.mapToEntity(createdUser);
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
