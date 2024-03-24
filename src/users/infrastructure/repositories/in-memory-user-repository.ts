import { User } from "@src/users/domain/user";
import { UserRepository } from "@src/users/domain/user-repository";

import { Injectable } from "@shared/domain/dependency-injection";

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    new User("1", "albert", "albert@gmail.com"),
    new User("2", "juan", "juan@gmail.com"),
    new User("3", "pepe", "pepe@gmail.com"),
  ];

  findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return Promise.resolve(user || null);
  }
}
