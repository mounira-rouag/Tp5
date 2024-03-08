import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  
  getAdminBoard(): Observable<any> {
    return this.http.get( `${environment.apiUrl}/test/admin` + 'user', { responseType: 'text' });
  }

  constructor(private http: HttpClient) { }

  registerUser(signUpRequest: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, signUpRequest);
  }

  
  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signin`,
      {
        username,
        password,
      },
      httpOptions
    );
  }
  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, { }, httpOptions);
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/change-password`, data);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/findemail?email=${email}`, null);
  }
  

  getPublicContent(): Observable<any> {
    return this.http.get( `${environment.apiUrl}/users/all`, { responseType: 'text' });
  }

  

}
