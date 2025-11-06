import MESSAGE from "@/shared/contants/message";
import { NextFunction, Response, Request } from "express";
import { ZodSchema, ZodError } from "zod";

export class ValiationMiddleware {
  validate<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedData = schema.parse(req.body);

        req.body = validatedData;

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors = error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message,
          }));

          return res.status(422).json({
            message: MESSAGE.COMMON.VALIDATION_ERROR || "Validation failed",
            errors: errors,
          });
        }

        return res.status(500).json({
          message: MESSAGE.SERVER.INTERNAL_ERROR,
        });
      }
    };
  }

  validateParams<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedData = schema.parse(req.params);
        req.params = validatedData as any;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors = error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message,
          }));

          return res.status(422).json({
            message: "Invalid parameters",
            errors: errors,
          });
        }

        return res.status(500).json({
          message: MESSAGE.SERVER.INTERNAL_ERROR,
        });
      }
    };
  }

  validateQuery<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedData = schema.parse(req.query);
        req.query = validatedData as any;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors = error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message,
          }));

          return res.status(422).json({
            message: "Invalid query parameters",
            errors: errors,
          });
        }

        return res.status(500).json({
          message: MESSAGE.SERVER.INTERNAL_ERROR,
        });
      }
    };
  }

  validateRequiredFields(fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const missing = fields.find(f => !req.body?.[f]);
      if (missing) {
        return res.status(422).json({
          message: MESSAGE.COMMON.REQUIRED_FIELD,
          errors: [
            {
              field: missing,
              message: MESSAGE.COMMON.REQUIRED_FIELD,
            },
          ],
        });
      }
      next();
    };
  }
}
