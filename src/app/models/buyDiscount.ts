import { Discount } from './discount';
import { CardType } from './cardType';

export interface BuyDiscount extends Discount {
  cardType: CardType;
}
