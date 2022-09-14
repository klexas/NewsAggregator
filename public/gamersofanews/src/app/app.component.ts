import { Component } from '@angular/core';
import * as config from './config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = config.default.site.name;
  constructor() {
    console.log(config.default.site.name);
    this.title = config.default.site.name;
  }
}
