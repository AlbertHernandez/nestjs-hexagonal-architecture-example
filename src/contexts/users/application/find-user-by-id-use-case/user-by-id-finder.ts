import { User } from "@/users/domain/user";
import { UserNotFoundException } from "@/users/domain/user-not-found-exception";
import { UserRepository } from "@/users/domain/user-repository";

import { Injectable } from "@/shared/dependency-injection/domain/injectable";

@Injectable()
export class UserByIdFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }
}
