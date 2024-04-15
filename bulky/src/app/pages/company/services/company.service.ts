import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUrl = "https://localhost:44335/api/Company";

  constructor(private http: HttpClient) { };

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCompany(companyData: Company): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/Create", companyData);
  }
  updateCompany(companyData: Company): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/Update", companyData);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: { id: id.toString() } });
  }
}
