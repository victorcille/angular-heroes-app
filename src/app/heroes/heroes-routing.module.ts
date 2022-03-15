import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    // Este es el componente padre, todo lo que definamos en el .ts y .html de este componente lo tendrán también las hijas
    // OJO: necesario utilizar la etiqueta <router-otlet></router-otlet> en el .html del padre para que se rendericen las hijas
    component: HomeComponent,   
    children: [                 // Todas estas son las hijas del HomeComponent
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule  // Tenemos que exportar el RouterModule para poder usar la etiqueta <router-otlet></router-otlet> en el home.component.html
  ]
})
export class HeroesRoutingModule { }
