import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino: string = '';
  public heroes: Heroe[] = [];
  public heroeSeleccionado: Heroe | undefined;

  constructor(private _heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscar()
  {
    if ( this.termino ) {  // Si hemos escrito alguna letra/palabra llamamos a nuestro servicio y buscamos por ese término

      this._heroesService.getSugerencias(this.termino.trim()).subscribe( heroes => {

        // Hacemos esto porque el api cuando mandamos una sola letra (p.ej la 'a') me devuelve más de 6 resultados (no sé porqué 
        // pero no aplica el limit)

        if ( heroes.length > 6 ){
          this.heroes = heroes.splice(0,6);
        } else {
          this.heroes = heroes;
        }
      });
    } else {
      // Si borramos lo que hemos escrito, vaciamos el array
      this.heroes.length = 0;
    }
  }

  opcionSeleccionada( evento: MatAutocompleteSelectedEvent )
  {
    // Controlamos que si seleccionamos la opción de error del select no haga la llamada a nuestro servicio
    if (!evento.option.value) { 
      this.heroeSeleccionado = undefined;
      return; 
    }

    const heroe: Heroe = evento.option.value;

    // Con esto lo que logramos es que al seleccionar una opción del select, no me imprima [object Object]
    this.termino = heroe.superhero;

    this._heroesService.getHeroe( heroe.id! ).subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}
