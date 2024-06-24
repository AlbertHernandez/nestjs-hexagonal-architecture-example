import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreatePaymentHttpDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsUUID()
  @IsNotEmpty()
  customerId!: string;
}
