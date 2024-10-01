import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreditCard} from "../models/creditCard";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  getCards(idClient: number): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>( `${this.apiUrl}/listarTarjetas/${idClient}`);
  }
}
