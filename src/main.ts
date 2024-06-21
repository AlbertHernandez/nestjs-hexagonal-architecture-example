import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { ErrorResponseNormalizerFilter } from "@/api-gateway/response-normalizer/error-response-normalizer.filter";
import { SuccessResponseNormalizerInterceptor } from "@/api-gateway/response-normalizer/success-response-normalizer.interceptor";
import { API } from "@/api-gateway/routes/constants";

import { Logger } from "@/shared/logger/domain";
import { LoggerInterceptor } from "@/shared/logger/infrastructure/logger.interceptor";
import { NestLoggerService } from "@/shared/logger/infrastructure/nestjs.logger-service";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  app.useLogger(app.get(NestLoggerService));
  app.setGlobalPrefix(API);

  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter));
  app.useGlobalInterceptors(
    app.get(LoggerInterceptor),
    app.get(SuccessResponseNormalizerInterceptor),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");
  const logger = app.get(Logger);

  await app.listen(port, "0.0.0.0");

  logger.info(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
