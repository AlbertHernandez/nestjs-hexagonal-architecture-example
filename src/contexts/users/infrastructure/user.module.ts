import { Module } from "@nestjs/common";

import { UserCreator } from "@/users/application/create/user-creator";
import { UserByIdFinder } from "@/users/application/find-by-id/user-by-id-finder";
import { UserRepository } from "@/users/domain/user-repository";
import { CreateUserController } from "@/users/infrastructure/api/create/create-user-controller";
import { FindUserController } from "@/users/infrastructure/api/find/find-user-controller";
import { InMemoryUserRepository } from "@/users/infrastructure/repositories/in-memory-user-repository";

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
