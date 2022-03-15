import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

// A partir de ahora y en los siguientes proyectos, vamos a ver que algunas rutas las cargaremos de manera explícita (como hemos hecho siempre)
// y otras las cargaremos mediante LazyLoad:
// 
// Básicamente para hacer el LazyLoad veremos que en cada módulo de mi aplicación (auth y heroes) tendremos un módulo de rutas muy parecido a
// este (auth-routing.module.ts y heroes-routing.module.ts). 
// 
// Estos módulos de rutas tendrán especificadas las rutas hijas correspondientes a cada parte de su módulo (p.ej. el módulo de auth tendrá
// una ruta para el login y otra para el registro). 
// 
// Con el LazyLoad lo que haremos será ir cargando las rutas sólo cuando las necesitemos y no todas a la vez como veníamos haciendo hasta ahora.
// 
// Esto es útil cuando vamos a manejar una aplicación grande/muy grande con muchas rutas y subrutas, componentes, etc... porque con esto
// se mejora la velocidad de carga de nuestra aplicación.


// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// Vamos a utilizar el guard que nos hemos creado para proteger el acceso a las rutas.
// 
// De esta forma vamos a limitar el acceso a algunas rutas si el usuario no está autenticado.
// 
// El canLoad lo que hace es controlar que el modulo se cargue o no se cargue en función de lo que especifiquemos en el guard pero tiene
// el inconveniente de que si el módulo ya estaba previamente cargado entonces el usuario va a poder acceder a esa/s ruta/s
// 
// Para solventar esto, además del canLoad vamos a utilizar el canActivate como una medida de seguridad adicional
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************

const routes: Routes = [
  // Así se cargan las rutas hijas mediante LazyLoad. 
  // Nótese que el loadChildren es una promesa que se va a disparar sólo cuando vayamos a esa ruta
  // Nótese también que lo que tenemos que importar es el módulo (auth.module.ts) y no el módulo de rutas (auth-routing.module.ts)
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule )
  },
  {
    path: 'heroes', 
    loadChildren: () => import('./heroes/heroes.module').then( module => module.HeroesModule ),
    canLoad: [ AuthGuard ],  // Con este canLoad estamos diciendole a Angular que no cargue el módulo si no pasa el guard
    canActivate: [ AuthGuard ]  // Con este canActivate estamos diciendole a Angular que no se active el módulo si no pasa el guard
  },
  // Estas rutas de errores sí las cargaremos de manera explícita (como veníamos haciendo hasta ahora)
  {
    path: '404', 
    component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: '404'
  }
];

@NgModule({
  imports: [
    // Este forRoot() es único en la aplicación (sólo va a haber 1) y se coloca aquí, en el app-routing.module porque aquí van las rutas
    // principales/globales. 
    // 
    // En los demás ficheros de rutas que veremos en los distintos módulos de mi aplicación, estaremos definiendo las rutas hijas y por eso
    // allí llevarán el forChild() y no el forRoot()
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
