import { Component, OnInit } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageURL = '';

  constructor(private artworkSvc: ArtworkService) { }

  ngOnInit(): void {
    this.artworkSvc.getHomeArtwork().subscribe((artwork: Artwork) => {
      console.log("Got home artwork of:", artwork);

      this.imageURL = globalConfig.imageRootURI + "/midsize/" + artwork.imagePath;
      console.log(this.imageURL)
    })
  }

}
