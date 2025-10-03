import { NextFunction, Request, Response } from "express";
import { IJwtService } from "@/services/jwt.service";
import MESSAGE from "@/shared/contants/message";

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
      console.error(error);
      return this.sendForbidden(res);
    }
  }

  private sendUnauthorized(res: Response) {
    return res.status(401).json({
      success: false,
      message: MESSAGE.AUTH.UNAUTHORIZED,
    });
  }

  private sendForbidden(res: Response) {
    return res.status(403).json({
      success: false,
      message: MESSAGE.AUTH.TOKEN_INVALID,
    });
  }
}
