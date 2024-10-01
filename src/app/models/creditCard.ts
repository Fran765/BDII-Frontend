export interface CreditCard {
  id: number;
  number: number;
  type: {id:number, name: String};
  activate: boolean;
  founds: number;
}
