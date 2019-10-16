import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                console.log(err)
                if (err.status === 401) {
                    this.authservice.signOut()
                    this.router.navigate(['/auth/login'])
                }
            }
            return throwError(err)
        }))
    }
}
