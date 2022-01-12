import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Artwork } from '../models/artwork';
import { HttpClient } from '@angular/common/http';
import { globalConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // private api: API;
  baseURI:string;

  constructor(private http: HttpClient) {
    // this.api = new API({baseURI: globalConfig.imageRootURI})
  }

  getThumbnailURL (artwork:Artwork): string {
    // return globalConfig.imageRootURI + "/" + artwork.url;
    if (artwork.number)
      return environment.apiUrl + "/images/thumbnail?filename=" + encodeURIComponent(artwork.number) + "&isNumber=true";
    else
      return environment.apiUrl + "/images/thumbnail?filename=" + encodeURIComponent(artwork.url);
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
