import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  // Vamos a inyectar nuestro servicio auth.service.ts
  constructor(
    private _authService: AuthService,
    private _router: Router  
  ) { }


  // Vamos a comprobar si el usuario se ha autenticado haciendo el login: 
  // si el objeto _auth del servicio tiene un id es que se ha autenticado y devolvemos true, si no devolvemos false.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
      // let response: boolean = false;

      // ( this._authService.auth.id ) ? response = true : response = false;
      
      // return response;

      return this._authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if ( !estaAutenticado ) {
            this._router.navigate(['./auth/login'])
          }
        })
      );
  }

  // Igual que arriba, comprobamos si el usuario ha hecho login o np para devolver un true o un false respectivamente
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
  {

      // let response: boolean = false;

      // ( this._authService.auth.id ) ? response = true : response = false;
      
      // return response;
      return this._authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if ( !estaAutenticado ) {
            this._router.navigate(['./auth/login'])
          }
        })
      );
    }
}
