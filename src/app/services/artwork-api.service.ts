import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artwork } from '../models/artwork';
import { environment } from '../../environments/environment';
import { globalConfig } from '../config'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtworkApiService {

  constructor(private http: HttpClient) { }

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

  isRecent (artwork: Artwork) {
    let recentYears = globalConfig.recentWorkYears * 365 * 24 * 60 * 60 * 1000;
    const diffMs = new Date().getTime() - new Date(artwork.year?.toString()).getTime();
    const res= diffMs <= recentYears;
    // console.log(`isRecent ${artwork.year} diff: ${diffMs}, ${globalConfig.recentWorkYears} ${recentYears} ->${res}`);
    return res;

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
      map(work => new Artwork(work)),
      tap(console.log)
    )
  }

    searchArtworks (searchTerm: string): Observable<Artwork[]> {
    return this.http.get(environment.apiUrl + "/works/search/" + searchTerm).pipe(
      map((x:any[]) => x.map(xx => new Artwork(xx))),
      map((artworks: Artwork[]) => artworks.filter(artwork => artwork.isActive))
    );
  }

}
