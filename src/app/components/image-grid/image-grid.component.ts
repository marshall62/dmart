import { Component, OnInit } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {
  exemplarTable;

  constructor(private artworkSvc: ArtworkService) { }

  ngOnInit(): void {
    this.artworkSvc.fetchExemplarArtworks().subscribe(artworks => {
      this.exemplarTable = this.tablify(artworks, 2)
    });
  }

  tablify(artworks, nCols): any[] {
    let table = [], row ;
    for (let index=0; index<artworks.length; index++) {
      if (index % nCols == 0) {
        if (index > 0)
          table.push(row);
        row = [];
      }
      row.push(artworks[index]);

    }
    table.push(row);
    return table;
  }

  imageURL (artwork: Artwork) {
    return globalConfig.imageRootURI + "/" + artwork?.url;
  }

}
