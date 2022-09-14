import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddLinkModel } from 'src/app/models/link/AddLinkModel';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  title: string = "";
  url: string = "";
  _linkService: LinkService;
  _router: Router;

  constructor(linkService: LinkService, router: Router) {
    this._linkService = linkService;
    this._router = router;
   }

  ngOnInit(): void {
  }

  async submitLink() {
    let newLink = new AddLinkModel({
      title: this.title,
      url: this.url
    });
    // Defensive programming here
    try {
      new URL(newLink.url).hostname;
    } catch (error) {
      console.log("Invalid URL");
      return;
    }

    await this._linkService.addLink(newLink);
    // TODO: Add some validation on the link

    console.log("Link added");
    // Route tot he homepage ?
    this._router.navigate(['/']);
  }
}
