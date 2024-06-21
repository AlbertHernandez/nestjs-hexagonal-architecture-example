/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { LoggerService } from "@nestjs/common";

import { Injectable } from "@/shared/dependency-injection/injectable";
import { Logger, LoggerLevel } from "@/shared/logger/domain";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestLoggerMessage = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestLoggerOptionalParams = any[];

@Injectable()
export class NestLoggerService implements LoggerService {
  constructor(private readonly logger: Logger) {}

  verbose(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams
  ) {
    this.call("debug", message, ...optionalParams);
  }

  debug(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    this.call("debug", message, ...optionalParams);
  }

  log(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    this.call("info", message, ...optionalParams);
  }

  warn(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    this.call("warn", message, ...optionalParams);
  }

  error(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    this.call("error", message, ...optionalParams);
  }

  fatal(
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    this.call("fatal", message, ...optionalParams);
  }

  private call(
    level: LoggerLevel,
    message: NestLoggerMessage,
    ...optionalParams: NestLoggerOptionalParams[]
  ) {
    const loggerMessage = {
      message: typeof message === "string" ? message : message?.message,
      attributes: {
        ...(optionalParams.length > 0
          ? { context: optionalParams.at(-1) }
          : {}),
        ...(optionalParams.length > 0 ? optionalParams.slice(0, -1) : {}),
      },
    };

    this.logger[level](loggerMessage.message, {
      attributes: loggerMessage.attributes,
    });
  }
}
