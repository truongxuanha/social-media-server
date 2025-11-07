import { Request, Response, NextFunction } from "express";
import { AppError } from "@/domain/errors/app.error";
import { BaseException } from "@/domain/exceptions";
import { ValidationException } from "@/domain/exceptions/validation.exception";
import { ResponseHelper } from "@/shared/utils/response.helper";
import Logger from "@/interfaces/http/logger/logger";
import MESSAGE from "@/shared/contants/message";

export class ErrorMiddleware {
  static handle() {
    return (
      error: Error | AppError | unknown,
      req: Request,
      res: Response,
      _next: NextFunction
    ): Response => {
      Logger.error("Error occurred:", error);
      if (error instanceof ValidationException) {
        return ResponseHelper.unprocessableEntity(res, {
          message: error.message,
          errors: error.errors,
        });
      }

      if (error instanceof BaseException) {
        return ErrorMiddleware.handleAppError(error, res);
      }

      if (error instanceof AppError) {
        return ErrorMiddleware.handleAppError(error, res);
      }

      if (error && typeof error === "object" && "code" in error) {
        const prismaError = error as { code?: string; meta?: unknown };
        if (prismaError.code?.startsWith("P")) {
          return ResponseHelper.serverError(res, MESSAGE.SERVER.DATABASE_ERROR);
        }
      }

      if (error && typeof error === "object" && "issues" in error) {
        return ResponseHelper.unprocessableEntity(res, {
          message: MESSAGE.COMMON.VALIDATION_ERROR,
          errors: [],
        });
      }

      return ErrorMiddleware.handleUnknownError(error, res);
    };
  }

  private static handleAppError(error: AppError, res: Response): Response {
    const statusCode = error.statusCode || 500;
    const message = error.message || MESSAGE.SERVER.INTERNAL_ERROR;

    if (process.env.NODE_ENV === "development") {
      Logger.error("Error stack:", error.stack);
    }

    switch (statusCode) {
      case 400:
        return ResponseHelper.badRequest(res, message);
      case 401:
        return ResponseHelper.unauthorized(res, message);
      case 403:
        return ResponseHelper.forbidden(res, message);
      case 404:
        return ResponseHelper.notFound(res, message);
      case 409:
        return ResponseHelper.conflict(res, message);
      case 422:
        return ResponseHelper.unprocessableEntity(res, { message });
      case 500:
      default:
        return ResponseHelper.serverError(res, message);
    }
  }

  private static handleUnknownError(error: unknown, res: Response): Response {
    const message =
      error instanceof Error ? error.message : MESSAGE.SERVER.INTERNAL_ERROR;

    if (process.env.NODE_ENV === "development") {
      Logger.error("Unknown error details:", error);
    }

    return ResponseHelper.serverError(res, message);
  }
}
