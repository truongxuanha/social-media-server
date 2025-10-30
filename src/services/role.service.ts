import { User } from "@/domain/entities/user.entity";

export interface IRoleService {
  hasRole(user: User, requiredRole: string): boolean;
  isAdmin(user: User): boolean;
  isUser(user: User): boolean;
}

export class RoleService implements IRoleService {
  hasRole(user: User, requiredRole: string): boolean {
    return user?.role === requiredRole;
  }

  isAdmin(user: User): boolean {
    return this.hasRole(user, "admin");
  }

  isUser(user: User): boolean {
    return this.hasRole(user, "user");
  }
}
