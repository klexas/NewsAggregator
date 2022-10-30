import { Component } from '@angular/core';
import * as config from './config.json';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _authservice: AuthService;
  title = config.default.site.name;
  isLoggedIn: boolean = false;

  constructor(authService: AuthService) {
    this._authservice = authService;
    console.log(config.default.site.name);
    this.title = config.default.site.name;
    this.isLoggedIn = this._authservice.isLoggedIn();
  }
}
