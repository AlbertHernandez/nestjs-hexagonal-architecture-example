import { Injectable } from "@/shared/dependency-injection/injectable";

import { User } from "@/users/domain/user";
import { UserRepository } from "@/users/domain/user.repository";

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private userIdToUserMap: Map<string, User>;

  constructor() {
    this.userIdToUserMap = new Map();
    const users: User[] = [
      new User("1", "albert", "albert@gmail.com"),
      new User("2", "juan", "juan@gmail.com"),
      new User("3", "pepe", "pepe@gmail.com"),
    ];
    for (const user of users) {
      this.userIdToUserMap.set(user.id, user);
    }
  }

  create(user: User): Promise<void> {
    this.userIdToUserMap.set(user.id, user);
    return Promise.resolve();
  }

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.userIdToUserMap.get(id) || null);
  }
}
