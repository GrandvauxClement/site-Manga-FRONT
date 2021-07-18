import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  logOut() {
    window.sessionStorage.clear();
  }
}
