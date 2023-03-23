import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { updateConfig } from './config';
import { ConfigService } from './services/config.service';

@Injectable()
export class AppInitService {
  _configSvc: ConfigService;

    constructor(configSvc: ConfigService) {
      console.log("In AppInitService with ", configSvc);
      this._configSvc = configSvc;
    }

    Init(): () => Observable<any> {
      console.log("In Init",this._configSvc);
      return () => this._configSvc.getConfig().pipe(tap(config => {
        console.log("Upadating config with ",config)
        updateConfig(config);
      }));
    }
}
