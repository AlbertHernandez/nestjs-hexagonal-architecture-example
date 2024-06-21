import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserHttpDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;
}
