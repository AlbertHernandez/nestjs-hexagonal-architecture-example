import { Body, Controller, Post } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { UserCreator } from "@src/users/application/create/user-creator";

import { USER_ROUTE } from "../route";
import { CreateUserHttpDto } from "./create-user-http-dto";

@Controller(USER_ROUTE)
export class CreateUserController {
  constructor(private readonly userCreator: UserCreator) {}

  @Post()
  async run(@Body() body: CreateUserHttpDto) {
    return await this.userCreator.run({
      id: uuidv4(),
      name: body.name,
      email: body.email,
    });
  }
}
