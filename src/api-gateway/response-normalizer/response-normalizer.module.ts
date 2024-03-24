import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { ErrorResponseNormalizerFilter } from "./error-response-normalizer.filter";
import { SuccessResponseNormalizerInterceptor } from "./success-response-normalizer.interceptor";

@Module({
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
export class ResponseNormalizerModule {}
