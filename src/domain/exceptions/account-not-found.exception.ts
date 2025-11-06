import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class AccountNotFoundException extends BaseException {
  constructor(message: string = MESSAGE.AUTH.ACCOUNT_NOT_EXIST) {
    super(message, 401, "ACCOUNT_NOT_FOUND");
  }
}
