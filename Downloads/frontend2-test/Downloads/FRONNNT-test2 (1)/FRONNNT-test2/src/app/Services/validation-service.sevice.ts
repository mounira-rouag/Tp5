import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { Validation } from "../Models/validation.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class ValidationService{
    constructor(private http: HttpClient) { }
   
    getValidationByDev(iddev: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/validation/by-dev/${iddev}`, { responseType: 'json' });
      }

      getVersionNameOfValidation(idValidation: number): Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}/validation/version-name/${idValidation}`);
      }
      getAllValidation(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/validation/all`,{ responseType: 'json' });
      }
      createValidation(validation: Validation,iddev:any): Observable<Validation> {
        
        return this.http.post<Validation>(`${environment.apiUrl}/validation/create/${iddev}`, validation);
      }
      createValidationwithnewDev(validation: Validation,): Observable<Validation> {
        
        return this.http.post<Validation>(`${environment.apiUrl}/validation/create`, validation);
      }
      
      
  }