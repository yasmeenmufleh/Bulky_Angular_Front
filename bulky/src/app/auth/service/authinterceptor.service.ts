import { Injectable } from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  private excludedUrls: string[] = [
    'https://localhost:44335/api/Products',
    'https://www.primefaces.org/cdn/api/upload.php'
  ];

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userData.pipe(
      take(1),
      exhaustMap(user => {
        if (!user || this.isExcludedUrl(req.url)) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + user.token,
          })
        });
        console.log('this is the modified request : ' + modifiedReq);
        return next.handle(modifiedReq);
      })
    );
  }

  private isExcludedUrl(url: string): boolean {
    // Check if the request URL is in the excludedUrls array
    return this.excludedUrls.includes(url);
  }

}
