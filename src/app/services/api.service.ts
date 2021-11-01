import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = "https://api.shrtco.de/v2/shorten";

  constructor(private httpClient: HttpClient) { }

  public getShortenLink(param: string) {
    let params = new HttpParams().set('url', param);
    return this.httpClient.get(this.API_URL, {params: params, observe: 'response'}).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      console.log(error.error);
      errorMessage = `Error: ${error.status}`;
    } else {
      // Server-side errors
      console.log(error.error);
      errorMessage = "Message: " + error.error.error.split(",")[0];
    }
    return throwError(errorMessage);
  }
}

