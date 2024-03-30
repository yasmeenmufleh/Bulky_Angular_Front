import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Product } from '../../product/Models/product';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private productSubject = new BehaviorSubject<Product>({});

  constructor() { }

  getProductSubject() {
    return this.productSubject.asObservable();
  }

  updateProducts(product: Product) {
    this.productSubject.next(product);
  }

  clearProducts() {
    this.productSubject.next({});
  }
}
