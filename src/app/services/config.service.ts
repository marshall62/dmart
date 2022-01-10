import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globalConfig } from '../config';

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
    return this.http.get(globalConfig.devAPIURI + "/config")
  }
}
