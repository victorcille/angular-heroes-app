import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private _http: HttpClient) { }

  get auth(): Auth
  {
    return { ...this._auth! };
  }

  verificaAutenticacion(): Observable<boolean>
  {
    // Comprobamos si en el local storage hay un userID guardado
    // Acordarse de que el operador of() lo que hace es crear un observable devolviendo como respuesta lo que especifiquemos en el paréntesis
    if ( !localStorage.getItem('userID') ) {
      return of( false );
    }

    // Ahora verificamos que obrtenemos respuesta haciendo una llamada al API con el userID guardado en el local storage 
    // El operador map() se usa para transformar la respuesta que se obtiene del observable y devolver otro tipo de valor/respuesta
    return this._http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
           .pipe(
             map( auth => {
              // Esta aplicación como es para aprender y es muy sencillita, tiene un fichero db.json en la carpeta 05-heroes-server.
              // Con este fichero estamos haciendo el back de la aplicación tirando de los heroes y del usuario que dicho fichero tiene
              // almacenados. Como usuarios sólo hay uno: Jhon Doe con id 1 y por eso estamos hardcodeando aquí y en el login la
              // autenticación con ese usuarios/1 de la url al hacer la petición http GET.
              // Lo suyo es que aquí guardasemos en una variable el userID almacenado en el local storage, que la petición http GET que
              // hiciésemos fuese `${ this.baseUrl }/usuarios/${userID}` y que en este map() comprobásemos que el auth que recibimos
              // como respuesta existe o no. Si existe devolveríamos el true y si no devolvemos un false.
              // Aquí como lo estamos hardcodeando con el usuarioID = 1, siempre devolvemos un true 
               this._auth = auth;
               return true;               
             })
           );
  }

  login(): Observable<Auth>
  {
    // El tap es utilizado para usar efectos secundarios. 
    // Cuando pase por esta petición, antes de llegar al subscribe se ejecutará lo que haya en el tap()
    // El tap() recibe la respuesta de la petición como parámetro (en este caso lo llamaremos auth)
    // Podemos poner tantos taps como queramos
    return this._http.get<Auth>(`${this.baseUrl}/usuarios/1`)
           .pipe(
             tap( auth => this._auth = auth ),
             tap( auth => localStorage.setItem('userID', auth.id) )
           );
  }

  logout(): void
  {
    this._auth = undefined;
    localStorage.removeItem('userID');
  }
}
