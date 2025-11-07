import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class IncorrectPasswordException extends BaseException {
  constructor(message: string = MESSAGE.AUTH.INCORRECT_PASSWORD) {
    super(message, 401, "INCORRECT_PASSWORD");
  }
}
