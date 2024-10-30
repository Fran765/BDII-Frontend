import {Category} from "./category";
import {Brand} from "./brand";

export interface Product {
  id: number;
  code: number;
  description: String;
  category: Category;
  brand: Brand;
  price: number;
  version: number;
}

export interface ProductUpdate {
  id: number;
  code: number;
  description: String;
  idCategory: number;
  idBrand: number;
  price: number;
  version: number;
}

export interface ProductSale{
  code: number;
  description: String;
  category: String;
  brand: String;
  price: number;
}
