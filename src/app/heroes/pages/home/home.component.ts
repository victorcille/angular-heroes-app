import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  get auth(): Auth
  {
    return this._authService.auth;
  }

  ngOnInit(): void {
  }

  logout(): void
  {
    this._authService.logout();
    this._router.navigate(['./auth']);
  }

}
