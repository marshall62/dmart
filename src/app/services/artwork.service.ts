import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { globalConfig } from '../config'
import { Artwork } from '../models/artwork';
import { defer, from } from 'rxjs';
import { MongoAtlasService } from '../mongo-atlas.service';

// Gets the artworks

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private _searchResults: any[] = [];

  constructor(private dbSvc: MongoAtlasService) { }

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
    if (group === "all") {
    return defer(() => from(this.dbSvc.artworks.find({isActive: true })
      .then(works => works.map(w => new Artwork(w))))) as Observable<Artwork[]>;
    }
    else if (group === "recent") {
      return defer(() => from(this.dbSvc.artworks.find({isActive: true })
      .then(works => works.map(w => new Artwork(w)).filter(aw => this.isRecent(aw))))) as Observable<Artwork[]>;
    }
    else {
      return defer(() => from(this.dbSvc.artworks.find({isActive: true, tags: group })
      .then(works => works.map(w => new Artwork(w))))) as Observable<Artwork[]>;
    }

  }



  fetchExemplarArtworks (): Observable<Artwork[]> {
    return defer(() => from(this.dbSvc.artworks.find({ tags: "exemplar" })
      .then(works => works.map(w => new Artwork(w))))) as Observable<Artwork[]>;
  }



  getHomeArtwork (): Observable<Artwork> {
    console.log("db is ",this.dbSvc);
    console.log("artworks is ",this.dbSvc.artworks);
    return defer(() => from(this.dbSvc.artworks.findOne({ tags: "home" })
      .then(aw => new Artwork(aw)))) as Observable<Artwork>;
  }



  searchArtworks (searchTerm: string): Observable<Artwork[]> {
    let num = Number(searchTerm);
    return defer(() => from(this.dbSvc.artworks.find({ $or: [{tags: {$regex: searchTerm}}, {title: {$regex: searchTerm}}, {media: {$regex: searchTerm}}, {year: num}] })
    .then(works => works.map(w => new Artwork(w))))) as Observable<Artwork[]>;
  }




}
