import { Module } from "@nestjs/common";

import { UserCreator } from "@/users/application/create-user-use-case/user-creator";
import { UserByIdFinder } from "@/users/application/find-user-by-id-use-case/user-by-id-finder";
import { UserRepository } from "@/users/domain/user-repository";
import { CreateUserController } from "@/users/infrastructure/api/create-user-api/create-user-controller";
import { FindUserByIdController } from "@/users/infrastructure/api/find-user-by-id-api/find-user-by-id-controller";
import { InMemoryUserRepository } from "@/users/infrastructure/repositories/in-memory-user-repository";

@Module({
  controllers: [CreateUserController, FindUserByIdController],
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
