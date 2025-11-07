import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class ForbiddenException extends BaseException {
  constructor(message: string = MESSAGE.AUTH.FORBIDDEN) {
    super(message, 403, "FORBIDDEN");
  }
}
