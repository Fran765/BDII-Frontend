import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ErrorHandlingService} from "./error-handling.service";
import { Brand } from '../models/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private apiUrl = 'http://localhost:8080/marcas';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getbrands():Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/`)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
