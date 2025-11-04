import logger from "@/shared/configs/logger.config";

export class Logger {
  static info(message: string, ...meta: any[]): void {
    logger.info(message, ...meta);
  }

  static warn(message: string, ...meta: any[]): void {
    logger.warn(message, ...meta);
  }

  static error(message: string, error?: Error | unknown, ...meta: any[]): void {
    if (error instanceof Error) {
      logger.error(message, {
        error: error.message,
        stack: error.stack,
        ...meta,
      });
    } else if (error) {
      logger.error(message, { error, ...meta });
    } else {
      logger.error(message, ...meta);
    }
  }

  static debug(message: string, ...meta: any[]): void {
    logger.debug(message, ...meta);
  }

  static verbose(message: string, ...meta: any[]): void {
    logger.verbose(message, ...meta);
  }
}

export default Logger;
