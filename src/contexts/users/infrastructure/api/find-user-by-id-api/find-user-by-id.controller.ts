import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { FindUserByIdUseCase } from "@/users/application/find-user-by-id-use-case/find-user-by-id.use-case";
import { UserNotFoundException } from "@/users/domain/user-not-found.exception";
import { USER_ROUTE } from "@/users/infrastructure/api/route";

@Controller(USER_ROUTE)
export class FindUserByIdController {
  constructor(private readonly userByIdFinder: FindUserByIdUseCase) {}

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
