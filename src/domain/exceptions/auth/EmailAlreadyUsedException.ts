import { BaseException } from "../BaseException";
import MESSAGE from "@/shared/contants/message";

export class EmailAlreadyUsedException extends BaseException {
  readonly statusCode = 422;
  readonly code = "EMAIL_ALREADY_USED";

  constructor() {
    super(MESSAGE.AUTH.EMAIL_ALREADY_USED);
  }
}
