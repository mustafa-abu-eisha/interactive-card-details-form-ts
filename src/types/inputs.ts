export interface InputsTypes {
  holderName: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
}

export type ErrorsTypes = Record<keyof InputsTypes, string | null>;
