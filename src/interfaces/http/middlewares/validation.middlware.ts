import MESSAGE from "@/shared/contants/message";
import { NextFunction, Response, Request } from "express";

export class ValiationMiddleware {
  validateRequiredFields(fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const missing = fields.find(f => !req.body?.[f]);
      if (missing) {
        return res.status(400).json({
          success: false,
          message: MESSAGE.COMMON.REQUIRED_FIELD,
        });
      }
      next();
    };
  }
}
