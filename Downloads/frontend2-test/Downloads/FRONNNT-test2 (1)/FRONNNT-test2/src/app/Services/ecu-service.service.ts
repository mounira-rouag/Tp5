import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class EcuService{
    constructor(private http: HttpClient) { }

    getAllEcu(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/ecu/all-ecu`, { responseType: 'json' });
      }
      createEcu(ecuData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/ecu/create`, ecuData);
      }
      getAllInjTypes(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/ecu/all-ecu-injection`, { responseType: 'json' });
      }
  }