import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptorOne implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loaderService.connect();
        
        
        //console.log('one');
        return next.handle(req).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    
                    this.loaderService.connect();
                }else{
                    this.loaderService.connect();
                }
                
                return Observable.throw(error.statusText);
            }),
            finalize(() => this.loaderService.show())
        
        );
    }
}