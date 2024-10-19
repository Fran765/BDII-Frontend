  import { Injectable } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {catchError, Observable} from 'rxjs';
  import {Product, ProductUpdate} from '../models/product';
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

  updateProduct(id: number, productUpdate: ProductUpdate): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/modificar/${id}`, productUpdate)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      )
  }
}
