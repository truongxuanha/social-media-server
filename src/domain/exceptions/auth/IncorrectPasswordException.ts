import { BaseException } from "../BaseException";
import MESSAGE from "@/shared/contants/message";

export class IncorrectPasswordException extends BaseException {
  readonly statusCode = 401;
  readonly code = "INCORRECT_PASSWORD";

  constructor() {
    super(MESSAGE.AUTH.INCORRECT_PASSWORD);
  }
}
