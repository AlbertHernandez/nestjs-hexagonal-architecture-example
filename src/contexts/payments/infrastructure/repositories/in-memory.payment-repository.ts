/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@/shared/dependency-injection/injectable";

import {
  Payment,
  PrimitivePayment,
} from "@/contexts/payments/domain/payment.entity";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";

@Injectable()
export class InMemoryPaymentRepository extends PaymentRepository {
  private payments: PrimitivePayment[] = [];

  async save(payment: Payment): Promise<void> {
    this.payments.push(payment.toPrimitives());
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = this.payments.find(payment => payment.id === id);
    return payment ? new Payment(payment) : null;
  }
}
