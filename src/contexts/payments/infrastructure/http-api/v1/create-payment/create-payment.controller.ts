import { Body, Controller, Post } from "@nestjs/common";

import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case/create-payment.use-case";
import { PrimitivePayment } from "@/contexts/payments/domain/payment.entity";
import { V1_PAYMENTS } from "@/contexts/payments/infrastructure/http-api/route.constants";
import { CreatePaymentHttpDto } from "@/contexts/payments/infrastructure/http-api/v1/create-payment/create-payment.http-dto";

@Controller(V1_PAYMENTS)
export class CreatePaymentController {
  constructor(private createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async run(
    @Body() createPaymentHttpDto: CreatePaymentHttpDto,
  ): Promise<{ payment: PrimitivePayment }> {
    return await this.createPaymentUseCase.execute({
      amount: createPaymentHttpDto.amount,
      customerId: createPaymentHttpDto.customerId,
    });
  }
}
