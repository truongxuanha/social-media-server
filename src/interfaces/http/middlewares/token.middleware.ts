import { NextFunction, Request, Response } from "express";
import { IJwtService } from "@/services/jwt.service";
import MESSAGE from "@/shared/contants/message";
import Logger from "@/interfaces/http/logger/logger";
import { ResponseHelper } from "@/shared/utils/response.helper";

export class TokenMiddleware {
  constructor(private jwtService: IJwtService) {}

  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return this.sendUnauthorized(res);
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return this.sendUnauthorized(res);
      }

      const decoded = this.jwtService.verify(token);

      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return this.sendForbidden(res);
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      Logger.error("Token verification failed", error);
      return this.sendForbidden(res);
    }
  }

  private sendUnauthorized(res: Response) {
    return ResponseHelper.unauthorized(res);
  }

  private sendForbidden(res: Response) {
    return ResponseHelper.forbidden(res, MESSAGE.AUTH.TOKEN_INVALID);
  }
}
