import { Injectable } from "@/shared/dependency-injection/injectable";

import { User } from "@/users/domain/user";
import { UserRepository } from "@/users/domain/user.repository";
import { UserNotFoundException } from "@/users/domain/user-not-found.exception";

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
