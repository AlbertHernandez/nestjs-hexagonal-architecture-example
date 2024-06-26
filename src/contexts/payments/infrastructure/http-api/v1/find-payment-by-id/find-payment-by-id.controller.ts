import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { FindPaymentByIdUseCase } from "@/contexts/payments/application/find-payment-by-id-use-case/find-payment-by-id.use-case";
import { PrimitivePayment } from "@/contexts/payments/domain/payment.entity";
import { PaymentNotFoundException } from "@/contexts/payments/domain/payment-not-found.exception";
import { V1_PAYMENTS } from "@/contexts/payments/infrastructure/http-api/route.constants";
import { FindPaymentByIdHttpDto } from "@/contexts/payments/infrastructure/http-api/v1/find-payment-by-id/find-payment-by-id.http-dto";

@Controller(V1_PAYMENTS)
export class FindPaymentByIdController {
  constructor(
    private readonly findPaymentByIdUseCase: FindPaymentByIdUseCase,
  ) {}

  @Get(":id")
  async run(
    @Param() params: FindPaymentByIdHttpDto,
  ): Promise<{ payment: PrimitivePayment }> {
    try {
      return await this.findPaymentByIdUseCase.execute({
        id: params.id,
      });
    } catch (error) {
      if (error instanceof PaymentNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
