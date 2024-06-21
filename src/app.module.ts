import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ApiGatewayModule } from "@/api-gateway/api-gateway.module";

import { UserModule } from "@/users/infrastructure/user.module";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

@Module({
  imports: [
    ApiGatewayModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UserModule,
  ],
})
export class AppModule {}
