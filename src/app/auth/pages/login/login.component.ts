import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      mat-grid-tile {
        padding-top: 50% !important;
      }

      mat-grid-list {
        padding-bottom: 50% !important;
      }
    `
  ]
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  login(): void
  {
    this._authService.login().subscribe( response => {
      if ( response.id ) {
        this._router.navigate(['./heroes']);
      } 
    });
  }
}
