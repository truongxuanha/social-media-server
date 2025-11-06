import { Response } from "express";
import { ResponseHelper } from "@/shared/utils/response.helper";

export class BaseController {
  protected success<T>(res: Response, dto?: T) {
    return ResponseHelper.success(res, dto);
  }

  protected created<T>(res: Response, data: T) {
    return ResponseHelper.created(res, data);
  }

  protected serverError(res: Response, message?: string) {
    return ResponseHelper.serverError(res, message);
  }

  protected badRequest(res: Response, message?: string) {
    return ResponseHelper.badRequest(res, message);
  }

  protected unauthorized(res: Response, message?: string) {
    return ResponseHelper.unauthorized(res, message);
  }

  protected forbidden(res: Response, message?: string) {
    return ResponseHelper.forbidden(res, message);
  }

  protected notFound(res: Response, message?: string) {
    return ResponseHelper.notFound(res, message);
  }

  protected conflict(res: Response, message?: string) {
    return ResponseHelper.conflict(res, message);
  }

  protected unprocessableEntity(
    res: Response,
    data: {
      message?: string;
      errors?: Array<{ field: string; message: string }>;
    }
  ) {
    return ResponseHelper.unprocessableEntity(res, data);
  }
}
