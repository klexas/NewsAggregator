import { Injectable } from '@angular/core';
import { LinkModel } from '../models/link/LinkModel';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient, private dal: DalService) {}

  public async getLinks(): Promise<LinkModel[]> {
    //TODO: Should actualyl be a DTO from the server.
    var data_dto = this.dal.get<any[]>(homeLinksUrl);
    console.log(data_dto);

    return new Promise((resolve, reject) => {
      let data = this.http.get(homeLinksUrl);
      let links: LinkModel[] = [];

      data.subscribe((response: any) => {
        response.forEach(
          (dto: any) => {
            links.push(new LinkModel(dto));
          }
        );
        resolve(links);
      });
    });
  }

  public async addLink(link: AddLinkModel): Promise<AddLinkModel> {
    return new Promise((resolve, reject) => {
      let data = this.http.post(homeLinksUrl + '/submit', link);
      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  public async getLink(id: string): Promise<LinkModel> {
    return new Promise((resolve, reject) => {
      let data = this.http.get(homeLinksUrl + '/' + id);
      data.subscribe((response: any) => {
        response.url_formatted = new URL(response.url ?? 'http://dev.null').hostname ?? 'Unknown';
        resolve(response);
      });
    });
  }

  public async getComments(id: string) : Promise<CommentModel[]> {
    return new Promise((resolve, reject) => {
      let data = this.http.get<CommentModel>(homeLinksUrl + '/comments/' + id );
      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  public async addComment(id:string, comment: AddCommentModel) : Promise<AddCommentModel> {
    return new Promise((resolve, reject) => {
      let data = this.http.post<AddCommentModel>(homeLinksUrl + '/comment/' + id, comment);
      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  public async voteUp(id: number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      let data = this.http.post<any>(homeLinksUrl + '/link/' + id + '/vote', { vote: 1});
      data.subscribe((response: any) => {
        resolve(true);
      });
    });
  }
}
