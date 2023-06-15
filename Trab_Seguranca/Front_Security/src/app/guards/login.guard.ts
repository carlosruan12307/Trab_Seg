import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private service: AuthServiceService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const l = localStorage.getItem('logged');
    const parse = l ? JSON.parse(l) : false;
    if (parse) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/']); // Redireciona para outra rota, se não estiver autenticado
      return false; // Bloqueia o acesso à rota
    }
  }
}
