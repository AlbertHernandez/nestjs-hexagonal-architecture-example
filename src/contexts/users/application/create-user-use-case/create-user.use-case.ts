import { User } from "@/users/domain/user";
import { UserRepository } from "@/users/domain/user.repository";

import { Injectable } from "@/shared/dependency-injection/domain/injectable";
import { Logger } from "@/shared/logger/domain";

import { CreateUserDto } from "./create-user.dto";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async run(createUserDto: CreateUserDto) {
    this.logger.info("Creating user");
    const user = new User(
      createUserDto.id,
      createUserDto.name,
      createUserDto.email,
    );
    await this.userRepository.create(user);
    this.logger.info("User created successfully", {
      attributes: { id: user.id },
    });
    return user;
  }
}
