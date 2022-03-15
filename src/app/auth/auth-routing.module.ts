import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'registro', component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];


@NgModule({
  imports: [
    // A diferencia del módulo de rutas global (app-routing.module.ts), aquí el RouterModule lleva el forChild() y no el forRoot()
    // porque en este fichero de rutas sólo estamos especificando rutas hijas
    // 
    // Por lo demás es igual, se importa el RouterModule, se le pasa al forChild() como parámetro las rutas que hemos definido para este 
    // módulo y se exporta
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }  // Este AuthRoutingModule lo importaremos en el module.ts de este módulo (auth.module.ts)
