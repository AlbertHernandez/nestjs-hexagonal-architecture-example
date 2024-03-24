import { User } from "@src/users/domain/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
}
