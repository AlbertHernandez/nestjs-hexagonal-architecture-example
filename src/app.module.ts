import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@shared/logger/infrastructure/logger.module";

import { ApiGatewayModule } from "./api-gateway/api-gateway.module";
import { UserModule } from "./users/infrastructure/user.module";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ApiGatewayModule,
    UserModule,
  ],
})
export class AppModule {}
