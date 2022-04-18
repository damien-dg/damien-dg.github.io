import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Card } from '../card';
import { CardbookService } from '../cardbook/cardbook.service';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  metadata: Map<Card, Map<string,number | Array<string>>> = new Map<Card, Map<string,number | Array<string>>>();
  error: any;

  constructor(private http: HttpClient, private cardbookService: CardbookService) { 
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
