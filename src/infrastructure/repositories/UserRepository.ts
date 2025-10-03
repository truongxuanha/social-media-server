import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { IUserRepository } from "@/application/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User({
      id: user.id,
      name: user.name,
      email: new Email({ address: user.email }),
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User({
      id: user.id,
      name: user.name,
      email: new Email({ address: user.email }),
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,  
      role: user.role,
    });
  }
}
