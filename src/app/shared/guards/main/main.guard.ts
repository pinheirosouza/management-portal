import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    this.auth.checkToken().then((res) => {
      if (!res) {
        this.router.navigate(['login']);
      }
    });
    return this.auth.checkToken();
  }
}
