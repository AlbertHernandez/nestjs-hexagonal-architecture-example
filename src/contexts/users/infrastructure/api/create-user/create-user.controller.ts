import { Body, Controller, Post } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateUserUseCase } from "@/users/application/create-user-use-case/create-user.use-case";
import { USER_ROUTE } from "@/users/infrastructure/api/route";

import { CreateUserHttpDto } from "./create-user.http-dto";

@Controller(USER_ROUTE)
export class CreateUserController {
  constructor(private readonly userCreator: CreateUserUseCase) {}

  @Post()
  async run(@Body() body: CreateUserHttpDto) {
    return await this.userCreator.run({
      id: uuidv4(),
      name: body.name,
      email: body.email,
    });
  }
}
