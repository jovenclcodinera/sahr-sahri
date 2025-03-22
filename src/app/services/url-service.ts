import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private httpClient: HttpClient) { }

  // isUrlValid(url: string): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     this.httpClient.get(url).subscribe({
  //       next: () => {
  //         try {
  //           new URL(url);
  //           resolve(true);
  //         } catch (_) {
  //           resolve(false);
  //         }
  //       },
  //       error: (err) => {
  //         if (err.status === 200) {
  //           console.log(err.status)
  //           resolve(true)
  //         } else {
  //           resolve(false)
  //         }
  //       }
  //     });
  //   });
  // }

  async isUrlValid(url: string): Promise<boolean> {
    try {
      const response = await this.httpClient.get(url).toPromise();
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async isValidImageUrl(url: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.httpClient.head(url, { observe: 'response' }));
      if (response.status === 200) {
        try {
          new URL(url);
          return true;
        } catch (_) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
