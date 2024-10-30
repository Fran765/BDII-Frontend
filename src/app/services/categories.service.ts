import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Category} from "../models/category";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>( `${this.apiUrl}/`)
      .pipe(
        catchError(this.errorHandlingService.handleError)
      );
  }
}
