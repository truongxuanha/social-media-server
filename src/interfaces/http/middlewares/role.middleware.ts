import { NextFunction, Request, Response } from "express";
import { IRoleService } from "@/services/role.service";
import MESSAGE from "@/shared/contants/message";

export class RoleMiddleware {
  constructor(private roleService: IRoleService) {}

  requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!this.roleService.hasRole(user, role)) {
        return res.status(403).json({
          success: false,
          message: MESSAGE.AUTH.FORBIDDEN,
        });
      }

      next();
    };
  }

  requireAdmin() {
    return this.requireRole("admin");
  }

  requireUser() {
    return this.requireRole("user");
  }
}
