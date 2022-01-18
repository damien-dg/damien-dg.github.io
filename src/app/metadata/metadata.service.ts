import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CardbookService } from '../cardbook/cardbook.service';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  metadata: Map<string, Map<string,number | Array<string>>> = new Map<string, Map<string,number | Array<string>>>();
  error: any;

  constructor(private http: HttpClient, private cardbookService: CardbookService) { 
    let resp = this.http.get(`${cardbookService.backendUrl}/card-metadata`)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe({
          next: (data: Object) =>{
            let map = new Map();
            for (let entry of Object.entries(data)) {
             let tags = new Map(Object.entries(entry[1]))
              map.set(entry[0], tags);
            }
            this.metadata = map;
          }, // success path
          error: (error => this.error = error) // error path
    })
    
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
