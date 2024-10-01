import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl= "http://localhost:8080/ventas";

  constructor(private http: HttpClient) { }

  getTotalPrice(idTarjeta: number, products: Product[]): Observable<number> {

    const requestBody = {
      idProducts: products.map(product => product.id)
    };

    return this.http.post<number>(`${this.apiUrl}/monto-total/${idTarjeta}`, requestBody);
  }

  completePurchase(idClient: number | null, idTarjeta: number | undefined, products: Product[]): void {
    const requestBody = {
      idProducts: products.map(product => product.id)
    };
    this.http.post(`${this.apiUrl}/finalizar-compra/${idClient}/${idTarjeta}`, requestBody);
  }
}
