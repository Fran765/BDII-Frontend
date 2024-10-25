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
    } else {
      // Aquí asignamos el mensaje de error que viene del backend
      errorMessage = error.error || `Mensaje: ${error.message}`;
    }

    // Devolver el error como un observable
    return throwError(errorMessage);
  }
}
