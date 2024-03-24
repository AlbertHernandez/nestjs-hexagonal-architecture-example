import { Module } from "@nestjs/common";

import { UserByIdFinder } from "@src/users/application/find-by-id/user-by-id-finder";
import { UserRepository } from "@src/users/domain/user-repository";
import { FindUserController } from "@src/users/infrastructure/api/find-user-controller";
import { InMemoryUserRepository } from "@src/users/infrastructure/repositories/in-memory-user-repository";

@Module({
  controllers: [FindUserController],
  providers: [
    UserByIdFinder,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
