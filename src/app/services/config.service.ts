import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable , OperatorFunction} from 'rxjs';
import { tap, filter} from 'rxjs/operators';
import { defer, from } from 'rxjs';
import {environment} from '../../environments/environment';
import {Config} from '../models/config';
import { MongoAtlasService } from '../mongo-atlas.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config:Subject<Config> = new BehaviorSubject<Config>({} as Config);

  constructor(private http: HttpClient, private dbSvc: MongoAtlasService) { }

  // When this service is called by the App component it takes the config object it gets in its subscription
  // and calls addConfig in this.  Other components like Home subscribe to config$ and get the Config object
  // when it finally comes in (note we filter out the {} initial one)

  get config$ (): Observable<Config> {
    return this.config.pipe(
      tap(val => { console.log("Config : ", val)}),
      filter((val) => val.imageRootURI !== undefined)
    )
  }

  addConfig (data:Config) {
    this.config.next(data);
  }


  getConfig (): Observable<any> {
    return defer(() => from(this.dbSvc.config.findOne({  }))) as Observable<any>;
  }

  getConfig2 (): Observable<any> {
    return this.http.get(environment.apiUrl + "/config")
  }
}
