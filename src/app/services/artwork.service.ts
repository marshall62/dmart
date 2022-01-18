import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { globalConfig } from '../config'
import { HttpClient } from '@angular/common/http';
import { Artwork } from '../models/artwork';
import { environment } from '../../environments/environment';

// Gets the artworks

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private _searchResults: any[] = [];

  constructor(private http: HttpClient) { }

  public set searchResults (results) {
    this._searchResults = results;
  }

  public get searchResults () {
    return this._searchResults;
  }

  isRecent (artwork: Artwork) {
    let recentYears = globalConfig.recentWorkYears * 365 * 24 * 60 * 60 * 1000;
    return (new Date().getTime() - new Date(artwork.date).getTime()) <= recentYears
  }

  fetchArtworks (group:string): Observable<Artwork[]> {
    if (group === "all")
      return this.http.get(environment.apiUrl + "/works").pipe(
        map((x:any[]) => x.map(xx => new Artwork(xx))),
      )
    else if (group === "recent") {
      // get all and filter the recent
      return this.http.get(environment.apiUrl + "/works").pipe(
        map((x: any[]) => x.map(xx => new Artwork(xx))),
        map((images:any[]) => images.filter(this.isRecent)),
        )
    }
    else
      return this.http.get(environment.apiUrl + "/works/tag/" + group).pipe(
        map((x:any[]) => x.map(xx => new Artwork(xx)))
      )

  }

  fetchExemplarArtworks (): Observable<Artwork[]> {
    return this.http.get(environment.apiUrl + "/works/tag/exemplar").pipe(
      map((x:any[]) => x.map(xx => new Artwork(xx)))
    )
  }

  getHomeArtwork (): Observable<Artwork> {
    return this.http.get(environment.apiUrl + "/works/tag/home").pipe(
      map((x:any[]) => new Artwork(x[0]))
    )
  }

  searchArtworks (searchTerm: string): Observable<Artwork[]> {
    return this.http.get(environment.apiUrl + "/works/search/" + searchTerm).pipe(
      map((x:any[]) => x.map(xx => new Artwork(xx)))
    );
  }




}
