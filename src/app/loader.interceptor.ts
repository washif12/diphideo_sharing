import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { LoaderService } from './loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.connect();
        this.loaderService.disconnect();
        
        
        //console.log('two');
        return next.handle(req).pipe(
            tap(() => this.loaderService.show()),
            finalize(() => this.loaderService.hide())
        );
    }
}