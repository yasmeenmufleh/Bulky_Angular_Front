import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { UserData } from '../models/userData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginFlagSubject = new BehaviorSubject<boolean>(true);
  private jwtHelper = new JwtHelperService();
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'https://localhost:44335/api/Authentication/';

  constructor(private http: HttpClient) { }

  registerUser(userData: Register): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Login', userData).pipe(
      tap(response => {
        if (response && response.token) {
          const decodedToken = this.jwtHelper.decodeToken(response.token);
          const userData: UserData = {
            name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            tokenExpiration: new Date(decodedToken.exp * 1000) // Convert seconds to milliseconds
          };
          this.userDataSubject.next(userData);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    this.userDataSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  isTokenExpired(): boolean {
    const userData = this.userDataSubject.value;
    if (!userData) {
      return true;
    }
    return userData.tokenExpiration < new Date();
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44335/api/Roles');
  }

  get userData$(): Observable<UserData | null> {
    return this.userDataSubject.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }


  getLoginFlagSubject() {
    return this.loginFlagSubject.asObservable();
  }

  updateLoginFlag(flag: boolean) {
    this.loginFlagSubject.next(flag);
  }

  clearProducts() {
    this.loginFlagSubject.next(true);
  }
}
