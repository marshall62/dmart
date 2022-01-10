import { Component, OnInit } from '@angular/core';
import { globalConfig } from 'src/app/config';
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
    this.artworkSvc.fetchExemplarArtworks().subscribe(images => {
      this.exemplarTable = this.tablify(images, 2)
    });
  }

  tablify(imageList, nCols): any[] {
    let table = [], row ;
    for (let index=0; index<imageList.length; index++) {
      if (index % nCols == 0) {
        if (index > 0)
          table.push(row);
        row = [];
      }
      row.push(imageList[index]);

    }
    table.push(row);
    return table;
  }

  imageURL (image) {
    return globalConfig.imageRootURI + "/" + image.url;
  }

}
