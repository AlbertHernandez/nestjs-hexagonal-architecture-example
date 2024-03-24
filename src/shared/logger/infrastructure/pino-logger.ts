import pino from "pino";

import { Injectable } from "@shared/dependency-injection/domain/injectable";
import { Context, Logger, LoggerLevel, Message } from "@shared/logger/domain";

export interface PinoLoggerDependencies {
  isEnabled?: boolean;
  level?: LoggerLevel;
}

@Injectable()
export class PinoLogger implements Logger {
  private readonly logger;

  constructor(dependencies: PinoLoggerDependencies) {
    this.logger = pino({
      enabled: dependencies.isEnabled ?? true,
      messageKey: "message",
      level: this.getGetPinoLevelFrom(dependencies.level || "info"),
      formatters: {
        level: (label: string, level: number) => {
          return {
            severity: this.getSeverityLevel(label),
            level,
          };
        },
      },
      base: undefined,
    });
  }

  debug(message: Message, context?: Context): void {
    this.call("debug", message, context);
  }

  info(message: Message, context?: Context): void {
    this.call("info", message, context);
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

  private call(level: pino.Level, message: Message, context?: Context) {
    const loggerMessage = {
      message,
      attributes: context?.attributes || {},
    };
    this.logger[level](loggerMessage);
  }

  private getSeverityLevel(label: string) {
    const pinoLevelToSeverityLookup: Record<pino.Level, string> = {
      trace: "DEBUG",
      debug: "DEBUG",
      info: "INFO",
      warn: "WARNING",
      error: "ERROR",
      fatal: "CRITICAL",
    };

    return (
      pinoLevelToSeverityLookup[label as pino.Level] ||
      pinoLevelToSeverityLookup.info
    );
  }

  private getGetPinoLevelFrom(loggerLevel: LoggerLevel): pino.Level {
    const loggerLevelToPinoLevelMap: Record<LoggerLevel, pino.Level> = {
      debug: "debug",
      info: "info",
      warn: "warn",
      error: "error",
      fatal: "fatal",
    };

    return loggerLevelToPinoLevelMap[loggerLevel];
  }
}
