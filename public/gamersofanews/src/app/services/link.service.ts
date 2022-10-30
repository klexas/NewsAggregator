import { Injectable } from '@angular/core';
import { LinkModel } from '../models/link/LinkModel';
import { DalService } from './dal.service';
import { AddLinkModel } from '../models/link/AddLinkModel';
import { CommentModel } from '../models/comment/CommentModel';
import { AddCommentModel } from '../models/comment/AddCommentModel';
import * as config from '../config.json';
const homeLinksUrl: string = config.default.site.api_base_url;

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private dal: DalService) {}

  public async getLinks(): Promise<LinkModel[]> {
    //TODO: Should actualyl be a DTO from the server.
    var data_dto = this.dal.get<any[]>(homeLinksUrl);
    console.log(data_dto);

    return new Promise(async (resolve, reject) => {
      let data = await this.dal.get<any>(homeLinksUrl);
      let links: LinkModel[] = [];

        data.forEach(
          (dto: any) => {
            links.push(new LinkModel(dto));
          }
        );
        resolve(links);
    });
  }

  public async addLink(link: AddLinkModel): Promise<AddLinkModel> {
    return new Promise(async (resolve, reject) => {
      let data = await this.dal.post<AddLinkModel>(homeLinksUrl + '/submit', link);
      if(data) resolve(data);
      else reject();
    });
  }

  public async getLink(id: string): Promise<LinkModel> {
    return new Promise(async (resolve, reject) => {
      let data = await this.dal.get<LinkModel>(homeLinksUrl + '/' + id);
      if(data) resolve(data);
      else reject();
    });
  }

  public async getComments(id: string) : Promise<CommentModel[]> {
    return new Promise(async (resolve, reject) => {
      let data = await this.dal.get<CommentModel[]>(homeLinksUrl + '/comments/' + id );
      if(data) resolve(data);
      else reject();
    });
  }

  public async addComment(id:string, comment: AddCommentModel) : Promise<AddCommentModel> {
    return new Promise(async (resolve, reject) => {
      let data = await this.dal.post<AddCommentModel>(homeLinksUrl + '/comment/' + id, comment);
      if(data) resolve(data);
      else reject();
    });
  }

  public async voteUp(id: number) : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let data = await this.dal.post<any>(homeLinksUrl + '/link/' + id + '/vote', { vote: 1});
      if(data) resolve(true);
      else reject();

    });
  }
}
