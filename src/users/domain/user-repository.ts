import { User } from "@src/users/domain/user";

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
}
