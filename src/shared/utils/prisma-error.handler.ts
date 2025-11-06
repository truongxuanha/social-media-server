import { Prisma } from "@prisma/client";
import {
  BadRequestException,
  ConflictException,
  InternalServerException,
  NotFoundException,
} from "@/domain/exceptions";
import MESSAGE from "@/shared/contants/message";

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new ConflictException(MESSAGE.COMMON.CONFLICT);
      case "P2025":
        throw new NotFoundException(MESSAGE.COMMON.NOT_FOUND);
      case "P2003":
        throw new BadRequestException("Dữ liệu tham chiếu không hợp lệ");
      case "P2014":
        throw new BadRequestException("Thiếu dữ liệu quan hệ bắt buộc");
      default:
        throw new InternalServerException(MESSAGE.SERVER.DATABASE_ERROR);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException("Dữ liệu không hợp lệ");
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new InternalServerException("Lỗi kết nối cơ sở dữ liệu");
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new InternalServerException("Lỗi nghiêm trọng từ cơ sở dữ liệu");
  }

  throw error;
}
