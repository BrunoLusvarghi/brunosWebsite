import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  /** POST: add a new hero to the database */
  sendEmail (email: any): Observable<any> {
  return this.http.post<any>("http://18.220.216.92:3000", email);
  }
}
 


