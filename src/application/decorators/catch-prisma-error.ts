import { handlePrismaError } from "@/shared/utils/prisma-error.handler";

export function CatchPrismaError(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      return handlePrismaError(error);
    }
  };

  return descriptor;
}
