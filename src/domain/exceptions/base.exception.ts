import { AppError } from "../errors/app.error";
import MESSAGE from "@/shared/contants/message";

export class BaseException extends AppError {
  constructor(
    message: string = MESSAGE.SERVER.INTERNAL_ERROR,
    statusCode: number = 500,
    errorCode: string = "BASE_ERROR"
  ) {
    super(message, statusCode, errorCode, true);
  }
}
