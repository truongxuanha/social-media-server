import { User } from "../../domain/entities/user.entity";

export interface IAuthRepository {
  register(user: User): Promise<User>;
  generateToken(
    user: User
  ): Promise<{ token: string; refreshToken: string } | null>;
}
