import { Discount } from './discount';
import { Brand } from './brand';

export interface ProductDiscount extends Discount {
  brand: Brand;
}
