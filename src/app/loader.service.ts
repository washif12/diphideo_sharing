import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Conn } from './gallery';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  connection: Conn[];
  URL = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8'
    })
  };

  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  options = { headers: this.headers };
  isLoading = new Subject<boolean>();
  isConnecting = new Subject<boolean>();
  connect(){
    this.isConnecting.next(true);
  }
  disconnect(){
    this.isConnecting.next(false);
  }
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }


  constructor( private http: HttpClient ) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  /*checkConnection(): Observable<Conn[]> {
    return this.http.get<any>(this.URL+'/IsServerAlive',this.httpOptions).pipe(
      map((res) => {
        //console.log(res['d']);
        this.connection = JSON.parse(res['d']);
        return this.connection;
    }),
    catchError(this.handleError));
  }*/

}
