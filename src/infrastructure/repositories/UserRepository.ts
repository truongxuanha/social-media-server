import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../application/repositories/IUserRepository";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email.address,
        password: user.password,
      },
    });
    console.log(createdUser);

    return new User({
      id: createdUser.id,
      name: createdUser.name,
      email: new Email({ address: createdUser.email }),
      password: createdUser.password,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

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
    });
  }
}
