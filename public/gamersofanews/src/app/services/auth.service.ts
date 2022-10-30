import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DalService } from './dal.service';
import * as config from '../config.json';
import { RegisterModel } from '../models/user/registerModel';
const homeLinksUrl: string = config.default.site.api_base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly bearerKey: string = 'bearerToken';

  constructor(private http: HttpClient) {}

  isLoggedIn = () => {
    return sessionStorage.getItem(this.bearerKey) != null;
  };

  setToken = (bearerToken: string) => {
    sessionStorage.setItem(this.bearerKey, bearerToken);
    return true;
  };

  getToken = () => {
    return sessionStorage.getItem(this.bearerKey);
  };

  loginUser = () => {};

  public async RegisterUser(regsiterInfo: RegisterModel): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = this.http.post(homeLinksUrl + '/register', regsiterInfo);
      data.subscribe((response: any) => {
        if (response.token) resolve(response.token);
        else reject();
      });
    });
  }
}
