import { Module } from "@nestjs/common";

import { HealthModule } from "./health/health.module";
import { ResponseNormalizerModule } from "./response-normalizer/response-normalizer.module";

@Module({
  imports: [HealthModule, ResponseNormalizerModule],
})
export class HttpApiModule {}
