import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Product} from "../models/product";
import {ErrorHandlingService} from "./error-handling.service";
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl= "http://localhost:8080/ventas";

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  getTotalPrice(idTarjeta: number, products: Product[]): Observable<number> {

    const requestBody = {
      idProducts: products.map(product => product.id)
    };

    return this.http.post<number>(`${this.apiUrl}/monto-total/${idTarjeta}`, requestBody)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }

  completePurchase(idClient: number | null, idTarjeta: number | undefined, products: Product[]): Observable<void> {
    const requestBody = {
      idProducts: products.map(product => product.id)
    };

    return this.http.post<void>(`${this.apiUrl}/finalizar-compra/${idClient}/${idTarjeta}`, requestBody)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }

  latestSales(idCliente: number | null): Observable<Sale[]> {

    return this.http.get<Sale[]>(`${this.apiUrl}/ultimas-ventas/${idCliente}`)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      )
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/`)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      )
  }

}
