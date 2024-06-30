import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HttpApiModule } from "@/src/app/http-api/http-api.module";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

import { PaymentModule } from "@/contexts/payments/infrastructure/payment.module";

@Module({
  imports: [
    HttpApiModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PaymentModule,
  ],
})
export class AppModule {}
