export class UserNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`User not found ${id}`);
  }
}
