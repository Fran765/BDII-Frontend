import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error || `Código del error: ${error.status}\nMensaje: ${error.message}`;
    }

     throw new Error(errorMessage);
  }
}
