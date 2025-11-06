import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class InternalServerException extends BaseException {
  constructor(message: string = MESSAGE.SERVER.INTERNAL_ERROR) {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}
