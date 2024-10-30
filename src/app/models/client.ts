import {CreditCard} from "./creditCard";

export interface Client {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  creditCards: CreditCard[];
}
