export class AddLinkModel {
  title: string;
  url: string;
  author: string;

  constructor(dto: any) {
    this.title = dto.title;
    this.url = dto.url;
    this.author = dto.author ?? 'Annonymous';
  };
 }
