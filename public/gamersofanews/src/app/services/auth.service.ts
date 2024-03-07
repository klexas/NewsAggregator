import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DalService } from './dal.service';
import * as config from '../config.json';
import { RegisterModel } from '../models/user/registerModel';
import { LoginModel } from '../models/user/loginModel';
const homeLinksUrl: string = config.default.site.api_base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly bearerKey: string = 'bearer_token_key';
  readonly userKey: string = 'username';

  constructor(private http: HttpClient) {}

  isLoggedIn = () => {
    return sessionStorage.getItem(this.bearerKey) != null;
  };

  setToken = (bearerToken: string) => {
    sessionStorage.setItem(this.bearerKey, bearerToken);
    return true;
  };

  setUser = (username: string) => {
    sessionStorage.setItem(this.userKey, username);
    return true;
  };

  getToken = () => {
    return sessionStorage.getItem(this.bearerKey);
  };

  public async LoginUser(lognInfo: LoginModel): Promise<LoginModel> {
    return new Promise((resolve, reject) => {
      let data = this.http.post(homeLinksUrl + '/login', lognInfo);
      data.subscribe((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          // TODO: Need username eventually
          this.setUser(response.username);
          resolve(response);
        }
        else {
          reject();
        }
      });
    });
  }
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
