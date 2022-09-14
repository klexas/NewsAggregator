export class AddCommentModel {
  author: string;
  body: string;
  date: Date;

   constructor(author: string, body: string) {
    this.author = author;
    this.body = body;
    this.date = new Date();
  };
}

