import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient){};

  getCategories() : Observable<any[]>{
    return this.http.get<any[]>("https://localhost:44335/api/Category");
  }
  
}
