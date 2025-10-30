import { NextFunction, Request, Response } from "express";
import { TokenMiddleware } from "./token.middleware";
import { RoleMiddleware } from "./role.middleware";
import { JwtService } from "@/services/jwt.service";
import { RoleService } from "@/services/role.service";

export class AuthMiddleware {
  private tokenMiddleware: TokenMiddleware;
  private roleMiddleware: RoleMiddleware;

  constructor() {
    const jwtService = new JwtService(
      process.env.JWT_SECRET || "JWT_SECRET_KEY"
    );
    const roleService = new RoleService();

    this.tokenMiddleware = new TokenMiddleware(jwtService);
    this.roleMiddleware = new RoleMiddleware(roleService);
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    return this.tokenMiddleware.verifyToken(req, res, next);
  }

  verifyAdmin(req: Request, res: Response, next: NextFunction) {
    this.tokenMiddleware.verifyToken(req, res, err => {
      if (err) return;

      const requireAdmin = this.roleMiddleware.requireAdmin();
      return requireAdmin(req, res, next);
    });
  }

  verifyUser(req: Request, res: Response, next: NextFunction) {
    this.tokenMiddleware.verifyToken(req, res, err => {
      if (err) return;

      const requireUser = this.roleMiddleware.requireUser();
      return requireUser(req, res, next);
    });
  }
}
