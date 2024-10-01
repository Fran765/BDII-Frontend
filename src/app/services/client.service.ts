import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CreditCard} from "../models/creditCard";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  getCards(idClient: number): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>( `${this.apiUrl}/listarTarjetas/${idClient}`)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }

}
