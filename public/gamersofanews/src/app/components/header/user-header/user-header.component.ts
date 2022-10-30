import { Component, OnInit } from '@angular/core';
import * as config from '../../../config.json';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  title: string = config.default.site.name;
  isCollapsed = false;
  userName: string | null;

  constructor() {
    this.title = config.default.site.name;
    this.userName = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href="";
  }
}
