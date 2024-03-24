import { Module } from "@nestjs/common";

import { UserCreator } from "@src/users/application/create/user-creator";
import { UserByIdFinder } from "@src/users/application/find-by-id/user-by-id-finder";
import { UserRepository } from "@src/users/domain/user-repository";
import { CreateUserController } from "@src/users/infrastructure/api/create/create-user-controller";
import { FindUserController } from "@src/users/infrastructure/api/find/find-user-controller";
import { InMemoryUserRepository } from "@src/users/infrastructure/repositories/in-memory-user-repository";

@Module({
  controllers: [CreateUserController, FindUserController],
  providers: [
    UserCreator,
    UserByIdFinder,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
