import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importamos las variables de entorno de nuestro fichero de desarrollo
import { environment } from 'src/environments/environment';


import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>
  {
    return this._http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroe( heroeID: string ): Observable<Heroe>
  {
    return this._http.get<Heroe>(`${ this.baseUrl }/heroes/${ heroeID }`);
  }

  getSugerencias( query: string ): Observable<Heroe[]>
  {
    // Definimos los parámetros que necesita el endpoint para filtrar búsquedas
    const params = new HttpParams()
        .set('q', query)
        .set('limit', '6');
  
    return this._http.get<Heroe[]>(`${ this.baseUrl }/heroes`, { params });
  }

  addHero( heroe: Heroe ): Observable<Heroe>
  {
    return this._http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  updateHero( heroe: Heroe ): Observable<Heroe>
  {
    return this._http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe);
  }

  deleteHero( heroeID: string ): Observable<any>
  {
    return this._http.delete<any>(`${ this.baseUrl }/heroes/${ heroeID }`);
  }
}
