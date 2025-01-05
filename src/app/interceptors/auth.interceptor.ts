import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.signOut();
            this.goToLogin();
          }
        }
        return throwError(err);
      })
    )
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
