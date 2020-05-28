import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) { }

  private async request(method: string, url: string, data?: any) {
    const token = await this.oktaAuth.getAccessToken();
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  saveCharacter(character) {
    return this.request('POST','http://localhost:6969/api/character/save/')
  }

  getCharacter() {
    return this.http.get('http://localhost:6969/api/character/get')
      .map((response: Response) => response.json());
  }

  deleteCharacter() {
    return this.http.post('http://localhost:6969/api/character/delete', {'id':id})
      .map((response: Response) => response.json());
  }

}
