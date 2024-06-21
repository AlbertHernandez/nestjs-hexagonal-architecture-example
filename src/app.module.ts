import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

import { HttpApiModule } from "@/http-api/http-api.module";

import { UserModule } from "@/users/infrastructure/user.module";

@Module({
  imports: [
    HttpApiModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UserModule,
  ],
})
export class AppModule {}
