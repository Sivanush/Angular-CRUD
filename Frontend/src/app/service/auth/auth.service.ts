import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BackendServiceService } from '../server/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private auth:BackendServiceService ,private  route:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log();
    if (this.auth.isAuthenticated()) {
      return true
    } else {

      this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false
    }
  }
}
