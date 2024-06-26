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
  
  export class CablesService{
    constructor(private http: HttpClient) { }

    getAllCables(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/cable/all`, { responseType: 'json' });
      }
      getcABLESByDev(devid: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/cable/by-dev/${devid}`, { responseType: 'json' });
      }
  }