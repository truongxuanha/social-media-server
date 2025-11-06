import { BaseException } from "../BaseException";
import MESSAGE from "@/shared/contants/message";

export class AccountNotFoundException extends BaseException {
  readonly statusCode = 401;
  readonly code = "ACCOUNT_NOT_FOUND";

  constructor() {
    super(MESSAGE.AUTH.ACCOUNT_NOT_EXIST);
  }
}
