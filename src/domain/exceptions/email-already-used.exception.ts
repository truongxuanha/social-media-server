import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class EmailAlreadyUsedException extends BaseException {
  constructor(message: string = MESSAGE.AUTH.EMAIL_ALREADY_USED) {
    super(message, 422, "EMAIL_ALREADY_USED");
  }
}
