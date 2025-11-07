import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class UnauthorizedException extends BaseException {
  constructor(message: string = MESSAGE.AUTH.UNAUTHORIZED) {
    super(message, 401, "UNAUTHORIZED");
  }
}
