import { IsNotEmpty, IsString } from "class-validator";

export class FindPaymentByIdHttpDto {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
