import { User } from "@src/users/domain/user";
import { UserRepository } from "@src/users/domain/user-repository";

import { Injectable } from "@shared/domain/dependency-injection";

import { CreateUserDto } from "./create-user-dto";

@Injectable()
export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  async run(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.id,
      createUserDto.name,
      createUserDto.email,
    );
    await this.userRepository.create(user);
    return user;
  }
}
