import MESSAGE from "@/shared/contants/message";
import { Response } from "express";

export class BaseController {
  protected success<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  protected created<T>(res: Response, data: T) {
    return res.status(201).json(data);
  }

  protected serverError(res: Response, message?: string) {
    return res
      .status(500)
      .json({ message: message || MESSAGE.SERVER.INTERNAL_ERROR });
  }

  protected badRequest(res: Response, message?: string) {
    return res
      .status(400)
      .json({ message: message || MESSAGE.COMMON.BAD_REQUEST });
  }

  protected unauthorized(res: Response, message?: string) {
    return res
      .status(401)
      .json({ message: message || MESSAGE.AUTH.UNAUTHORIZED });
  }

  protected forbidden(res: Response, message?: string) {
    return res.status(403).json({ message: message || MESSAGE.AUTH.FORBIDDEN });
  }

  protected notFound(res: Response, message?: string) {
    return res
      .status(404)
      .json({ message: message || MESSAGE.COMMON.NOT_FOUND });
  }

  protected conflict(res: Response, message?: string) {
    return res
      .status(409)
      .json({ message: message || MESSAGE.COMMON.CONFLICT });
  }

  protected unprocessableEntity(
    res: Response,
    data: {
      message?: string;
      errors?: Record<string, string>[];
    }
  ) {
    return res.status(422).json(data);
  }
}
