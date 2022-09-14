import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DalService {
  constructor(private http: HttpClient) {}

  public async get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = this.http.get(url);

      data.subscribe((response: any) => {
        resolve(response);
      });
      // TODO: Add some error handling.
    });
  }

  public async post<T>(url: string, body: any): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = this.http.post(url, body);

      data.subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
