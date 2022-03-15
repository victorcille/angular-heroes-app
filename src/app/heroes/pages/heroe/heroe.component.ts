import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroe;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this._activeRoute.params
    .pipe(
      switchMap( ({ id }) => this._heroesService.getHeroe( id ) )
    )
    .subscribe( heroe => this.heroe = heroe );
  }

  regresar()
  {
    this._router.navigate(['/heroes/listado']); // Otra forma de navegar en vez de utilizar el RouterLink en el html
  }

}
