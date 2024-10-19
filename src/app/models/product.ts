export interface Product {
  id: number;
  code: number;
  description: String;
  category: {id: number, name: String};
  brand: {id: number, name: String};
  price: number;
}

export interface ProductUpdate {
  id: number;
  code: number;
  description: String;
  idCategory: number;
  idBrand: number;
  price: number;
}
