import { User } from "../../domain/entities/user.entity";

export interface IAuthRepository {
  register(user: User): Promise<User>;
}
