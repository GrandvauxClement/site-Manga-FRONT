import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private  http: HttpClient, private jwtToken: JwtHelperService) { }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  logIn(email, password): Observable<any> {
    return this.http.post<any>( this.apiUrl + '/login_check', {
      username: email,
      password: password
    })
  }

  register(email, password, pseudo): Observable<any> {
    return this.http.post<any>( this.apiUrl + '/register',{
      email: email,
      password: password,
      pseudo: pseudo
    })
  }

  saveUser(token: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };

    return this.http.get(this.apiUrl + '/api/getUserActive', httpOptions);
  }

  public isAuthenticated(): boolean {
    const token =   window.sessionStorage.getItem('auth-token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtToken.isTokenExpired(token);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/forgot_password/', {
      email: email
    })
  }

  checkIfUserExistByEmail(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/checkIfUserExistByEmail', {
      email: email
    })
  }

  resetPassword(token, password): Observable<any>{
    return this.http.post<any>( this.apiUrl + '/forgot_password/' + token, {
      password: password
    })
  }
}
