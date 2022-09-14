import { Component, Input, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { AddCommentModel } from 'src/app/models/comment/AddCommentModel';
import { CommentModel } from 'src/app/models/comment/CommentModel';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comments: CommentModel[] = [];
  @Input()
  id: string = '';

  _linkService: LinkService;
  comment_input: string = '';

  constructor(linkService: LinkService) {
    this._linkService = linkService;
    }

  ngOnInit(): void {
    this.populateComments();
  }

  async submitComment() {
    var comment = new AddCommentModel('Adam', this.comment_input);
    await this._linkService.addComment(this.id, comment);
    this.comment_input = '';
    this.populateComments();
  }

  private async populateComments() {
    console.log(this.id);
    this.comments = await this._linkService.getComments(this.id);
  }
}
