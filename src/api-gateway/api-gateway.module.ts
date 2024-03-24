import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { ErrorResponseNormalizerFilter } from "@src/api-gateway/response-normalizer/error-response-normalizer.filter";

import { HealthModule } from "./health/health.module";
import { SuccessResponseNormalizerInterceptor } from "./response-normalizer/success-response-normalizer.interceptor";

@Module({
  imports: [HealthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseNormalizerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorResponseNormalizerFilter,
    },
  ],
})
export class ApiGatewayModule {}
