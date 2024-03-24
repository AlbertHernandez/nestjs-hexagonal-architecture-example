import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ApiGatewayModule } from "./api-gateway/api-gateway.module";
import { UserModule } from "./users/infrastructure/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ApiGatewayModule,
    UserModule,
  ],
})
export class AppModule {}
