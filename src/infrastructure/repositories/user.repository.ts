import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { BaseRepository } from "./base.repository";

// Định nghĩa filter type cho User
interface UserFilter {
  email?: string;
  name?: string;
}

export class UserRepository
  extends BaseRepository<User, UserFilter>
  implements IUserRepository
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
      createdAt: prismaUser.createdAt || new Date(),
      updatedAt: prismaUser.updatedAt,
    });
  }

  protected buildWhereClause(filter?: UserFilter): Record<string, unknown> {
    const baseFilter = super.buildWhereClause(filter);

    if (filter?.email) {
      baseFilter.email = filter.email;
    }
    if (filter?.name) {
      baseFilter.name = { contains: filter.name };
    }

    return baseFilter;
  }

  async findById(id: string): Promise<User | null> {
    const user = await super.findById(id);
    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findFirst({ email });

    if (!user) return null;

    return this.mapToEntity(user);
  }
}
