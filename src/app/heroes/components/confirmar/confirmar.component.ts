import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Heroe    // Hacemos pública esta variable para poder usarla en el .html
  ) { }

  ngOnInit(): void {
  }

  borrar(): void
  {
    // Si le damos al botón de confirmar, cerramos la ventana y mandamos de vuelta al padre el true como respuesta
    this._dialogRef.close( true );
  }

  cerrar(): void
  {
    // Si le damos al botón de cancelar, cerramos la ventana y mandamos de vuelta al padre nada(undefined) como respuesta
    this._dialogRef.close();
  }

}
