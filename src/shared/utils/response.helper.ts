import MESSAGE from "@/shared/contants/message";
import { Response } from "express";

export class ResponseHelper {
  static success<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  static created<T>(res: Response, data: T) {
    return res.status(201).json(data);
  }

  static serverError(res: Response, message?: string) {
    return res
      .status(500)
      .json({ message: message || MESSAGE.SERVER.INTERNAL_ERROR });
  }

  static badRequest(res: Response, message?: string) {
    return res
      .status(400)
      .json({ message: message || MESSAGE.COMMON.BAD_REQUEST });
  }

  static unauthorized(res: Response, message?: string) {
    return res
      .status(401)
      .json({ message: message || MESSAGE.AUTH.UNAUTHORIZED });
  }

  static forbidden(res: Response, message?: string) {
    return res.status(403).json({ message: message || MESSAGE.AUTH.FORBIDDEN });
  }

  static notFound(res: Response, message?: string) {
    return res
      .status(404)
      .json({ message: message || MESSAGE.COMMON.NOT_FOUND });
  }

  static conflict(res: Response, message?: string) {
    return res
      .status(409)
      .json({ message: message || MESSAGE.COMMON.CONFLICT });
  }

  static unprocessableEntity(
    res: Response,
    data: {
      message?: string;
      errors?: Array<{ field: string; message: string }>;
    }
  ) {
    return res.status(422).json(data);
  }
  static error<T>(
    res: Response,
    statusCode: number,
    message?: string,
    errors?: T
  ) {
    return res.status(statusCode).json({
      message: message || MESSAGE.COMMON.SERVER_ERROR,
      errors: errors,
    });
  }
}
