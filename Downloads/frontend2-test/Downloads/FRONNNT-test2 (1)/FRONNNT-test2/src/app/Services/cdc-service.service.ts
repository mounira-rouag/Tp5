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
  
  export class CDCService{
    constructor(private http: HttpClient) { }

    getAllCdc(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/cdc/all`, { responseType: 'json' });
      }
      getCdcByDev(devid: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/cdc/by-dev/${devid}`, { responseType: 'json' });
      }
      updateSignedState(ischecked: boolean, cdcId: number): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/cdc/update-signed-state/${ischecked}/${cdcId}`, { responseType: 'json' });
      
      }
      getCdcByMaj(idMaj: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/cdc/by-Maj/${idMaj}`, { responseType: 'json' });
      }
  }