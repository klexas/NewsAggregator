import { CommentModel } from "../comment/CommentModel";

export class LinkModel {
  id: number;
  title: string;
  url: string = '';
  url_formatted: string;
  author: string;
  votes: number;
  date: string;
  comment_count: number;
  comments: CommentModel[] = [];
  hasVoted: boolean = false;

  constructor(dto: any) {
    this.id = dto._id;
    this.title = dto.title;
    this.url = dto.url;
    this.author = dto.author;
    this.comment_count = dto.comment_count ?? 0;
    // Odd case if url is null - this is a bug in the API.
    this.url_formatted = new URL(dto.url ?? 'http://dev.null').hostname ?? 'Unknown' ;
    this.date = dto.date;
    this.votes = dto.meta?.votes ?? 0;
  };
 }
