  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>( `${this.apiUrl}/` );
  }
}
