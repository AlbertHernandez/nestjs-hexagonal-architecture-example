import { Body, Controller, Post } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateUserUseCase } from "@/users/application/create-user-use-case/create-user.use-case";
import { USER_ROUTE } from "@/users/infrastructure/http-api/route.constant";

import { CreateUserHttpDto } from "./create-user.http-dto";

@Controller(`v1/${USER_ROUTE}`)
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
