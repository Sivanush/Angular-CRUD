import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BackendServiceService } from '../server/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate{

  constructor(private router:Router,private auth:BackendServiceService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()&&this.auth.isAdmin()) {
      return true 
    } else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
