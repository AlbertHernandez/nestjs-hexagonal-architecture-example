import { Module } from "@nestjs/common";

import { CreateUserUseCase } from "@/users/application/create-user-use-case/create-user.use-case";
import { FindUserByIdUseCase } from "@/users/application/find-user-by-id-use-case/find-user-by-id.use-case";
import { UserRepository } from "@/users/domain/user.repository";
import { CreateUserController } from "@/users/infrastructure/http-api/v1/create-user/create-user.controller";
import { FindUserByIdController } from "@/users/infrastructure/http-api/v1/find-user-by-id/find-user-by-id.controller";
import { InMemoryUserRepository } from "@/users/infrastructure/repositories/in-memory.user-repository";

@Module({
  controllers: [CreateUserController, FindUserByIdController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    InMemoryUserRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByIdUseCase],
})
export class UserModule {}
