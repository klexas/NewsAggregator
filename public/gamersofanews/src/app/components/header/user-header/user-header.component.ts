import { Component, OnInit } from '@angular/core';
import * as config from '../../../config.json';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  title: string;
  isCollapsed = false;
  userName: string;
  // TODO: Clean up needed
  // @Input() title: string = '';
  constructor() {
    this.title = config.default.site.name;
    this.userName = "Admin";
  }

  ngOnInit(): void {
  }
}
