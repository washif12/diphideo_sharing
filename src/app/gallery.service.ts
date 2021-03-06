import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { Gallery, Conn } from './gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  URL = environment.baseUrl;
  gallery: Gallery[];
  connection: Conn[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8'
    })
  };

  //headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  /* Getting Data from server */
  getAll(): Observable<Gallery[]> {
    return this.http.get<any>(this.URL+'/GetGalleryList',this.httpOptions).pipe(
      map((res) => {
        this.gallery = JSON.parse(res['d']);
        return this.gallery;
    }),
    catchError(this.handleError));
  }

  checkConnection(): Observable<Conn[]> {
    return this.http.get<any>(this.URL+'/IsServerAlive',this.httpOptions).pipe(
      map((res) => {
        //console.log(res['d']);
        this.connection = res['d'];
        return this.connection;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  printID(postData){
    return this.http.post<any>(this.URL+'/SendPrintToQueue', {imageID: postData}, this.httpOptions);
  }

  /*postId(id): Observable<any> {
    //console.log(postData)
    return this.http
      .post(this.URL+'/SendEmailToQueue', {imageID: id}, this.httpOptions);
  }*/

  sendmail(credential,id): Observable<any> {
    
    return this.http
      .post(this.URL+'/SendEmailToQueue', {email: credential,imageID: id}, this.httpOptions);
  }
}
