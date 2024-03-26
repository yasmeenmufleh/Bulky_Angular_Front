import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44335/api/Products";

  constructor(private http: HttpClient) { };

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(formData : FormData): Observable<any> {

    return this.http.post(`${this.apiUrl}/create`, formData);
  }

  updateProduct(formData : FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: { id: id.toString() } });
  }
}
