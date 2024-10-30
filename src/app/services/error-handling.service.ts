import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'object' && error.error.message) {
      errorMessage = `Mensaje: ${error.error.message}`;
    } else {
      errorMessage = `Mensaje: ${error.message}`;
    }

    // Envía el error como observable
    return throwError(() => new Error(errorMessage));
  }
}
