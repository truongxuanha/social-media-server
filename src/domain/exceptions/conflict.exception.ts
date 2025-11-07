import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class ConflictException extends BaseException {
  constructor(message: string = MESSAGE.COMMON.CONFLICT) {
    super(message, 409, "CONFLICT");
  }
}
