import { Module } from "@nestjs/common";

import { CreatePaymentUseCase } from "@/contexts/payments/application/create-payment-use-case/create-payment.use-case";
import { FindPaymentByIdUseCase } from "@/contexts/payments/application/find-payment-by-id-use-case/find-payment-by-id.use-case";
import { PaymentRepository } from "@/contexts/payments/domain/payment.repository";
import { CreatePaymentController } from "@/contexts/payments/infrastructure/http-api/v1/create-payment/create-payment.controller";
import { FindPaymentByIdController } from "@/contexts/payments/infrastructure/http-api/v1/find-payment-by-id/find-payment-by-id.controller";
import { InMemoryPaymentRepository } from "@/contexts/payments/infrastructure/repositories/in-memory.payment-repository";

@Module({
  controllers: [CreatePaymentController, FindPaymentByIdController],
  providers: [
    CreatePaymentUseCase,
    FindPaymentByIdUseCase,
    InMemoryPaymentRepository,
    {
      provide: PaymentRepository,
      useExisting: InMemoryPaymentRepository,
    },
  ],
  exports: [CreatePaymentUseCase, FindPaymentByIdUseCase],
})
export class PaymentModule {}
