  import { Injectable } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {catchError, Observable} from 'rxjs';
  import { Product } from '../models/product';
  import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) { }

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>( `${this.apiUrl}/` )
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
