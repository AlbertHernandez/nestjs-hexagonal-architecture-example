import { Injectable } from "@nestjs/common";

import { FindPaymentByIdDto } from "@/contexts/payments/application/find-payment-by-id-use-case/find-payment-by-id.dto";
import { PrimitivePayment } from "@/contexts/payments/domain/payment.entity";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";
import { PaymentNotFoundException } from "@/contexts/payments/domain/payment-not-found.exception";

@Injectable()
export class FindPaymentByIdUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(
    findPaymentByIdDto: FindPaymentByIdDto,
  ): Promise<{ payment: PrimitivePayment }> {
    const payment = await this.paymentRepository.getById(findPaymentByIdDto.id);

    if (!payment) {
      throw new PaymentNotFoundException(findPaymentByIdDto.id);
    }

    return {
      payment: payment.toValue(),
    };
  }
}
