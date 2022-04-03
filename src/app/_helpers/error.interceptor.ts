import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@app/_services/alert.service';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private alertService:AlertService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    return next.handle(req).pipe(catchError(err => {
      const error = err.error?.message || err.statusText;
      this.alertService.error(err);
      console.error(err);
      return throwError(()=>error);
    }))
  }

}
