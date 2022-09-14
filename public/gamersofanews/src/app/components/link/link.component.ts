import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentModel } from 'src/app/models/comment/CommentModel';
import { LinkModel } from 'src/app/models/link/LinkModel';
import { LinkService } from 'src/app/services/link.service';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Title } from "@angular/platform-browser";
import * as config from '../../../app/config.json';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent implements OnInit {
  comments: CommentModel[] = [];
  id: string = '';
  hasVoted: boolean = false;
  faThumbsDown: any = faThumbsDown;
  faThumbsUp: any = faThumbsUp;
  private sub: any;

  // Link stuff
  _linkService: LinkService;
  _titleService: Title;
  link: LinkModel = new LinkModel('');

  constructor(
    private route: ActivatedRoute,
    linkService: LinkService,
    titleService:Title) {
    this._linkService = linkService;
    this._titleService = titleService;
  }
  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.link = await this._linkService.getLink(this.id);
    this._titleService.setTitle(config.default.site.name + ' | ' + this.link.title);
    console.log(this.link);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this._titleService.setTitle(config.default.site.name);
  }

  // TODO: Deal with later.
  voteUp() {
    this.hasVoted = true;
  }

}
