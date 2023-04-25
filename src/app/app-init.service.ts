import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { updateConfig } from './config';
import { ConfigService } from './services/config.service';
import { MongoAtlasService } from './mongo-atlas.service';

@Injectable()
export class AppInitService {
  _configSvc: ConfigService;
  _dbSvc: MongoAtlasService;

    constructor(configSvc: ConfigService, userSvc: MongoAtlasService) {
      console.log("In AppInitService with ", configSvc);
      this._configSvc = configSvc;
      this._dbSvc = userSvc;
    }

    setConfig(): Observable<any> {
      return this._configSvc.getConfig().pipe(tap(config => {
        console.log("Upadating config with ",config)
        updateConfig(config);
      }))  ;
    }

    init(): () => Observable<any> 
    {
      // sequences first logging into the mongo atlas db (as anonymous) and then setting the global configuration 
      return () => 
        this._dbSvc.login2().pipe(switchMap(_ => this.setConfig()));
    }


// Old one before we had to sequence two async calls as observables.
  //   init(): () => Observable<any> {
  //     return () => this._configSvc.getConfig().pipe(tap(config => {
  //       console.log("Upadating config with ",config)
  //       updateConfig(config);
  //   }
  //     ));
  // }
}
