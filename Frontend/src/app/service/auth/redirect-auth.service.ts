import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { BackendServiceService } from '../server/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthService implements CanActivate {

  constructor(private auth:BackendServiceService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home'])
      return false
    } else {
      return true
    }
  }


}
