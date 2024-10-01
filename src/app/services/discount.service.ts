import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Discount} from "../models/discount";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private apiUrl = 'http://localhost:8080/descuentos';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>( `${this.apiUrl}/` )
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
