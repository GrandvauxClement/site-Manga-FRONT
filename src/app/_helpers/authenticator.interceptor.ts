import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthenticatorInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      if (this.authService.isAuthenticated()){
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      }
      else {
        this.token.logOut();
      }

    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticatorInterceptor, multi: true }
];
