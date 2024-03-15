import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../Model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44335/api/Category";

  constructor(private http: HttpClient) { };

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCategory(categoryData: Category): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    return this.http.post<any>(this.apiUrl + "/Create", categoryData, { headers });
  }
  updateCategory(categoryData: Category): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');

    return this.http.post<any>(this.apiUrl + "/Update", categoryData, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: { id: id.toString() } });
  }

}
