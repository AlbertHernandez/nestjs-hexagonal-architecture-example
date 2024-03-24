import { Global, Module, Provider } from "@nestjs/common";

import { Logger } from "@shared/logger/domain";

import { NestJsLogger } from "./nestjs-logger";

const loggerProvider: Provider = {
  provide: Logger,
  useClass: NestJsLogger,
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
