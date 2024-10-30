import {CardType} from "./cardType";

export interface CreditCard {
  id: number;
  number: number;
  type: CardType;
  activate: boolean;
  founds: number;
}
