import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { UserData } from '../models/userData';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  private apiUrl = 'https://localhost:44335/api/Authentication/';
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private loginFlagSubject = new BehaviorSubject<boolean>(true);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userData: Register) {
    return this.http.post<any>(`${this.apiUrl}Register`, userData).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  login(userData: Login) {
    return this.http.post<any>(`${this.apiUrl}Login`, userData).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }


  autoLogin() {
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      const userData: UserData = JSON.parse(userDataString);
      this.userDataSubject.next(userData);
      this.isLoggedInSubject.next(true);
      const expirationDuration =
        new Date(userData.tokenExpiration).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      if(!this.isTokenExpired){
        this.userDataSubject.next(null);
        this.isLoggedInSubject.next(false);
      }
      return true;
    }
    return false;
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration : ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  logout() {
    sessionStorage.removeItem('userData');
    this.userDataSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  isTokenExpired(): boolean {
    const userData = this.userDataSubject.value;
    return !userData || userData.tokenExpiration < new Date();
  }

  getRoles() {
    return this.http.get<any[]>('https://localhost:44335/api/Roles');
  }

  get userData() {
    return this.userDataSubject.asObservable();
  }

  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  getLoginFlagSubject() {
    return this.loginFlagSubject.asObservable();
  }

  updateLoginFlag(flag: boolean) {
    this.loginFlagSubject.next(flag);
  }

  clearLoginFlag() {
    this.loginFlagSubject.next(true);
  }

  private handleAuthentication(response: any) {
    if (response && response.token) {
      const decodedToken = this.jwtHelper.decodeToken(response.token);
      console.log(response.token);
      console.log(decodedToken);
      const expirationDate = new Date(decodedToken.exp * 1000);
      const formattedExpirationDate = expirationDate.toLocaleString();
      console.log(formattedExpirationDate);
      const userData: UserData = {
        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        tokenExpiration: new Date(decodedToken.exp * 1000),
        token: response.token
      };
      sessionStorage.setItem('userData', JSON.stringify(userData));
      this.userDataSubject.next(userData);
      this.isLoggedInSubject.next(true);
      const expirationDuration =
        new Date(userData.tokenExpiration).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);

    }
  }
}
