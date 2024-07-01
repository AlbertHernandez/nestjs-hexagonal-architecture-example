import { v4 as uuidv4 } from "uuid";

export interface PrimitivePayment {
  id: string;
  amount: number;
  customerId: string;
}

export class Payment {
  constructor(private attributes: PrimitivePayment) {}

  static create(createPayment: {
    amount: number;
    customerId: string;
  }): Payment {
    return new Payment({
      id: uuidv4(),
      amount: createPayment.amount,
      customerId: createPayment.customerId,
    });
  }

  toPrimitives(): PrimitivePayment {
    return {
      id: this.attributes.id,
      amount: this.attributes.amount,
      customerId: this.attributes.customerId,
    };
  }
}
