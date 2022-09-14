import { Component, Input, OnInit } from '@angular/core';
import * as config from '../../config.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string;
  isCollapsed = false;
  // TODO: Clean up needed
  // @Input() title: string = '';
  constructor() {
    this.title = config.default.site.name;
  }

  ngOnInit(): void {
  }

}
