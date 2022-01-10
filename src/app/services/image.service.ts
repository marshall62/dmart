import { Injectable } from '@angular/core';
import { globalConfig } from '../config'
import { Artwork } from '../models/artwork';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // private api: API;
  baseURI:string;

  constructor(private http: HttpClient) {
    // this.api = new API({baseURI: globalConfig.imageRootURI})
  }

  getThumbnailURL (artwork:Artwork) {
    // return globalConfig.imageRootURI + "/" + artwork.url;
    if (artwork.number)
      return globalConfig.devAPIURI + "/images/thumbnail/" + encodeURIComponent(artwork.number) + "?isNumber=true";
    else
      return globalConfig.devAPIURI + "/images/thumbnail/" + encodeURIComponent(artwork.url);
  }

  testThumbExists (artwork: Artwork) {
    const url = globalConfig.imageRootURI + "/thumb/" + artwork.url;
    // get image in the thumbnail dir
    return window.fetch(url, {method: 'GET', mode: 'cors'})
      .then(response => {
        return response.ok;
      })
      .catch(error =>  {
        console.log(`testThumbExists Error `, error);
        return false;
      })
  }


}
