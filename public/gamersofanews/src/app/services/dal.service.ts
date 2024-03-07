import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DalService {
  readonly _AuthService: AuthService;
  constructor(private http: HttpClient, private authService: AuthService) {
    this._AuthService = this.authService;
  }

  public async get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = this.http.get(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._AuthService.getToken()}` }
      });

      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  public async post<T>(url: string, body: any): Promise<T> {
    return new Promise((resolve, reject) => {
      //  Get the bearer token
      let data = this.http.post(url, body, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._AuthService.getToken()}` }
      });

      try {
        // Subscribe to the data and reject errors
        data.subscribe((response: any) => {
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
