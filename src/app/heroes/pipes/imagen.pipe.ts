import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

// IMPORTANTE: Si no especificamos el atributo 'pure' al pipe, Angular internamente le asignará el valor true por defecto. El atributo 'pure'
// lo que hace es disparar el pipe cuando el argumento del transform cambia (en este caso el heroe).
// Problema:   Si editamos la url de la imagen del héroe y ponemos otra, la imagen no se actualiza hasta que no recargamos la pantalla o nos
//             movemos a otra url. Esto es porque aunque la propiedad alt_img sí que está cambiando, el objeto heroe sigue siendo el mismo y
//             como tengamos puesto el 'pure' a true o directamente no lo tengamos (acordarse que no tenerlo es como tenerlo puesto a true)
//             entonces el pipe no se dispara y la imagen no se actualiza.
// Solución:   Asignar false al atributo 'pure' del pipe. 

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string 
  { 
    if ( !heroe.id ) {
      return 'assets/no-image.png';
    } else if ( heroe.id && !heroe.alt_img && !(heroe.id.includes('marvel') || heroe.id.includes('dc'))) {
      return 'assets/no-image.png';
    } else if ( heroe.alt_img ) {
      return heroe.alt_img
    } else {
      return `assets/heroes/${ heroe.id }.jpg`;
    }
  }

}
