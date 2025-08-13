import { HostListener, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const requiredPermissions: string[] = route.data['requiredPermissions'] || [];

      if (this.authService.isAuthenticated()) {

        if (!requiredPermissions.length) return resolve(true);

        if (this.authService.userHasAnyPermission(requiredPermissions)) {
          return resolve(true);
        }

        this.router.navigate(['error/403']);
        return false;

      } else if (!this.authService.isAuthenticated()) {
        this.authService.logout();
        return resolve(false);
      }

    });
  }
}
