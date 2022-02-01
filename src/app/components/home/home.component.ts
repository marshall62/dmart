import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { ArtworkService } from 'src/app/services/artwork.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageURL = '';

  constructor(private artworkSvc: ArtworkService, private configSvc: ConfigService) { }

  ngOnInit(): void {
    this.configSvc.config$.subscribe(config => {
      console.log("In HomeComponent with config ",config);

      this.artworkSvc.getHomeArtwork().subscribe((artwork: Artwork) => {
        console.log("Got home artwork of:", artwork);

        this.imageURL = config.imageRootURI + "/midsize/" + artwork.imagePath;
        console.log(this.imageURL)
      })
    })

  }

}
