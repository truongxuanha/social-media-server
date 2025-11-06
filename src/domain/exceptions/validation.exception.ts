import { BaseException } from "./base.exception";
import MESSAGE from "@/shared/contants/message";

export class ValidationException extends BaseException {
  public readonly errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string = MESSAGE.COMMON.VALIDATION_ERROR,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message, 422, "VALIDATION_ERROR");
    this.errors = errors;
  }
}
