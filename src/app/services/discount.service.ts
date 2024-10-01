import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Discount} from "../models/discount";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private apiUrl = 'http://localhost:8080/descuentos';

  constructor(private http: HttpClient) { }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>( `${this.apiUrl}/` );
  }
}
