import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // _config;

  // public set config (c) {
  //   this._config = c;
  // }

  // public get config () {
  //   return this._config;
  // }

  constructor(private http: HttpClient) { }

  getConfig (): Observable<any> {
    return this.http.get(environment.apiUrl + "/config")
  }
}
