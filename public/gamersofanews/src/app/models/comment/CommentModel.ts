export class CommentModel {
  id: string;
  author: string;
  body: string;
  date: Date;
  votes: number;
  comments: CommentModel[] = []; // comments can have comments

   constructor(id: string, author: string, body: string, date: Date, votes: number) {
    this.id = id;
    this.author = author;
    this.body = body;
    this.date = date;
    this.votes = votes;
    this.comments = new Array<CommentModel>();
  };
}

