import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
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
    const diffMs = new Date().getTime() - new Date(artwork.year?.toString()).getTime();
    const res= diffMs <= recentYears;
    // console.log(`isRecent ${artwork.year} diff: ${diffMs}, ${globalConfig.recentWorkYears} ${recentYears} ->${res}`);
    return res;

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
        // tap(console.log),
        map((artworks:Artwork[]) => artworks.filter(artwork => artwork.isActive && this.isRecent(artwork))),
        )
    }
    else
      return this.http.get(environment.apiUrl + "/works/tag/" + group).pipe(
        map((x:any[]) => x.map(xx => new Artwork(xx))),
        map((artworks: Artwork[]) => artworks.filter(artwork => artwork.isActive))
      )

  }

  fetchExemplarArtworks (): Observable<Artwork[]> {
    return this.http.get(environment.apiUrl + "/works/tag/exemplar").pipe(
      map((x:any[]) => x.map(xx => new Artwork(xx))),
      map((artworks: Artwork[]) => artworks.filter(artwork => artwork.isActive))
    )
  }

  getHomeArtwork (): Observable<Artwork> {
    return this.http.get(environment.apiUrl + "/works/tag/home").pipe(
      map((works:any[]) => works.find(work => work.isActive)),
      map(work => new Artwork(work))
    )
  }

  searchArtworks (searchTerm: string): Observable<Artwork[]> {
    return this.http.get(environment.apiUrl + "/works/search/" + searchTerm).pipe(
      map((x:any[]) => x.map(xx => new Artwork(xx))),
      map((artworks: Artwork[]) => artworks.filter(artwork => artwork.isActive))
    );
  }




}
