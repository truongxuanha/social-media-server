import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class NotFoundException extends BaseException {
  constructor(message: string = MESSAGE.COMMON.NOT_FOUND) {
    super(message, 404, "NOT_FOUND");
  }
}
