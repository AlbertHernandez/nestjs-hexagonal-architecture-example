import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { UserByIdFinder } from "@src/users/application/find-by-id/user-by-id-finder";
import { UserNotFoundException } from "@src/users/domain/user-not-found-exception";

import { USER_ROUTE } from "../route";

@Controller(USER_ROUTE)
export class FindUserController {
  constructor(private readonly userByIdFinder: UserByIdFinder) {}

  @Get(":id")
  async run(@Param("id") id: string) {
    try {
      return await this.userByIdFinder.run(id);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
