export interface Product {
  id: number;
  code: number;
  description: String;
  category: {id: number, name: String};
  brand: {id: number, name: String};
  price: number;
}
