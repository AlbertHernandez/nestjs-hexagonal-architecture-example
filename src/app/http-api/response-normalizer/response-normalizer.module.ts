import { Module } from "@nestjs/common";

import { ErrorResponseNormalizerFilter } from "./error-response-normalizer.filter";
import { SuccessResponseNormalizerInterceptor } from "./success-response-normalizer.interceptor";

@Module({
  providers: [
    SuccessResponseNormalizerInterceptor,
    ErrorResponseNormalizerFilter,
  ],
  exports: [
    SuccessResponseNormalizerInterceptor,
    ErrorResponseNormalizerFilter,
  ],
})
export class ResponseNormalizerModule {}
