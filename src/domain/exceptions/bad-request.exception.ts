import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class BadRequestException extends BaseException {
  constructor(message: string = MESSAGE.COMMON.BAD_REQUEST) {
    super(message, 400, "BAD_REQUEST");
  }
}
