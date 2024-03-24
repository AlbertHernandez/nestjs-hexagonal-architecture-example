import { Logger as NestLogger } from "@nestjs/common";
import { LogLevel } from "@nestjs/common/services/logger.service";

import { Injectable } from "@shared/dependency-injection/domain/injectable";
import { Context, Logger, Message } from "@shared/logger/domain";

@Injectable()
export class NestJsLogger implements Logger {
  private readonly logger = new NestLogger();

  debug(message: Message, context?: Context): void {
    this.call("debug", message, context);
  }

  info(message: Message, context?: Context): void {
    this.call("log", message, context);
  }

  warn(message: Message, context?: Context): void {
    this.call("warn", message, context);
  }

  error(message: Message, context?: Context): void {
    this.call("error", message, context);
  }

  fatal(message: Message, context?: Context): void {
    this.call("fatal", message, context);
  }

  private call(level: LogLevel, message: Message, context?: Context) {
    const loggerMessage = {
      message,
      attributes: context?.attributes || {},
    };
    this.logger[level](loggerMessage);
  }
}
