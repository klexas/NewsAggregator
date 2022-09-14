import { Component, OnInit } from '@angular/core';
import { LinkModel } from 'src/app/models/link/LinkModel';
import { LinkService } from 'src/app/services/link.service';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  linkService: LinkService;
  linkList: LinkModel[] = [];
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  hasVoted: boolean = false;

  constructor(_linkService: LinkService) {
    this.linkService = _linkService;
  }

  async ngOnInit(): Promise<void> {
    this.linkList = await this.linkService.getLinks();
  }

  voteUp(link: LinkModel) {
    try {
      this.linkService.voteUp(link.id);
      link.votes++;
      link.hasVoted = true;
    } catch (error) {
      console.log(error);
    }
  }

  voteDown(link: LinkModel) {
    link.votes--;
    link.hasVoted = true;
  }
}
