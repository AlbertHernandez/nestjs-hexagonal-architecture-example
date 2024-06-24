export class PaymentNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Payment not found ${id}`);
  }
}
