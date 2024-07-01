import { Payment } from "@/contexts/payments/domain/payment.entity";

export abstract class PaymentRepository {
  abstract save(payment: Payment): Promise<void>;
  abstract findById(id: string): Promise<Payment | null>;
}
