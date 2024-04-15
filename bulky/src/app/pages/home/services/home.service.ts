import { Injectable } from '@angular/core';
import { Product } from '../../product/Models/product';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl = "https://localhost:44335/api/Cart";

  private productSubject = new BehaviorSubject<Product>({});

  constructor(private http: HttpClient) { }

  getProductSubject() {
    return this.productSubject.asObservable();
  }

  updateProducts(product: Product) {
    this.productSubject.next(product);
  }

  clearProducts() {
    this.productSubject.next({});
  }

  addToCart(cart : ShoppingCart): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, cart);
  }

}
