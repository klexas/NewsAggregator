import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DalService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public async get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });

      let data = this.http.get(url, { headers });

      data.subscribe((response: any) => {
        resolve(response);
      });
      // TODO: Add some error handling.
    });
  }

  public async post<T>(url: string, body: any): Promise<T> {
    return new Promise((resolve, reject) => {
      //  Get the bearer token
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })

      let data = this.http.post(url, body, { headers });

      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
