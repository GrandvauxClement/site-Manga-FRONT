import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import * as JWT from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = window.sessionStorage.getItem('auth-token');
    // decode the token to get its payload
    const tokenPayload = JWT(token);

    if (
      this.auth.isAuthenticated() && tokenPayload['roles'].includes('ROLE_ADMIN')
    ) {
      return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }

  }
  canActivateMenu(): boolean {
    // this will be passed from the route config
    // on the data property
    const token = window.sessionStorage.getItem('auth-token');
    // decode the token to get its payload
    const tokenPayload = JWT(token);

    if (
      this.auth.isAuthenticated() && tokenPayload['roles'].includes('ROLE_ADMIN')
    ) {
      return true;
    } else {
      return false;
    }

  }

}
