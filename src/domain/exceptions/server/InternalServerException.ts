import { BaseException } from "../BaseException";
import MESSAGE from "@/shared/contants/message";

export class InternalServerException extends BaseException {
  readonly statusCode = 500;
  readonly code = "INTERNAL_SERVER_ERROR";

  constructor() {
    super(MESSAGE.SERVER.INTERNAL_ERROR);
  }
}
