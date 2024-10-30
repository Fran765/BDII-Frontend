import { Client } from "./client";
import { ProductSale } from "./product";
import {CreditCard} from "./creditCard";

export interface Sale {
  dateAndTime: string;
  client: Client;
  products: ProductSale[];
  totalPrice: number;
  card: CreditCard
  invoiceNumber: String;
}
