import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  apiUrl = "https://localhost:44335/api/Cart";

  constructor(private http: HttpClient) { }


  getCartOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCartOrders`);
  }

  plus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Pluse`, { params: { id: id.toString() } });
  }
  minus(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Minus`, { params: { id: id.toString() } });
  }
  deleteCartItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: { id: id.toString() } });
  }

}
