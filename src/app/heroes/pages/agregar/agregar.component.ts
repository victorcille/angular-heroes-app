import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

// Este componente lo vamos a utilizar tanto para agregar un heroe nuevo como para editar uno que ya exista

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  public heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  };

  public edit: boolean = false;

  constructor(
    private _heroesService: HeroesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void 
  {
    // Vamos a checkear si estamos en agregar o en editar heroe:
    if ( this._router.url.includes('editar') ) {
      this.edit = true;

      this._activeRoute.params
      .pipe(
        switchMap( ({ id }) => this._heroesService.getHeroe( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );

    } else {
      this.edit = false;
    }
  }

  guardar(): void
  {
    // Hacemos una pequeña validación (que por lo menos el héroe tenga un nombre de superhéroe)
    if ( !this.heroe.superhero.trim() ) {
      return;
    }

    if ( !this.edit ) {
      // Insertamos
      this._heroesService.addHero( this.heroe ).subscribe( heroe => {
        this._router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar( 'Registro creado!!' )
      });
    } else {
      // Actualizamos
      this._heroesService.updateHero( this.heroe ).subscribe( heroe => {
        this._router.navigate([`/heroes/listado`]);
        this.mostrarSnackbar( 'Registro actualizado!!' );
      });
    }
  }

  borrar(): void
  {
    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '300px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe( response => {

      if ( response ) 
      {
        this._heroesService.deleteHero( this.heroe.id! ).subscribe( () => {
          this._router.navigate([`/heroes/listado`]);
          this.mostrarSnackbar( 'Registro borrado!!' );
        });
      }
    });
  }

  mostrarSnackbar( mensaje: string ): void
  {
    this._snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

}
