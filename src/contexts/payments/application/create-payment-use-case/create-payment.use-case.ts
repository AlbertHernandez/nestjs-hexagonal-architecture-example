import { Injectable } from "@/shared/dependency-injection/injectable";

import {
  Payment,
  PrimitivePayment,
} from "@/contexts/payments/domain/payment.entity";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";

import { CreatePaymentDto } from "./create-payment.dto";

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(dto: CreatePaymentDto): Promise<{ payment: PrimitivePayment }> {
    const payment = Payment.create(dto);

    await this.paymentRepository.create(payment);

    return {
      payment: payment.toValue(),
    };
  }
}
