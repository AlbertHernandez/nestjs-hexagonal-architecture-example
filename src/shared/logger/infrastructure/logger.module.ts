import { Global, Module, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Logger, LoggerLevel } from "@shared/logger/domain";

import { LoggerInterceptor } from "./logger.interceptor";
import { NestLoggerService } from "./nestjs-logger-service";
import { PinoLogger, PinoLoggerDependencies } from "./pino-logger";

const loggerProvider: Provider = {
  provide: Logger,
  useFactory: (configService: ConfigService) => {
    const isLoggerEnabled = configService.get<boolean>("LOGGER_ENABLED");
    const loggerLevel = configService.get<LoggerLevel>("LOGGER_LEVEL");
    const dependencies: PinoLoggerDependencies = {
      isEnabled: isLoggerEnabled,
      level: loggerLevel,
    };
    return new PinoLogger(dependencies);
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [loggerProvider, NestLoggerService, LoggerInterceptor],
  exports: [loggerProvider, NestLoggerService, LoggerInterceptor],
})
export class LoggerModule {}
