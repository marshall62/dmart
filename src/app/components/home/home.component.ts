import { Component, OnInit } from '@angular/core';
import { globalConfig } from 'src/app/config';
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
    this.artworkSvc.getHomeArtwork().subscribe((artwork: Artwork) => {
      this.imageURL = globalConfig.imageRootURI + "/midsize/" + artwork.imagePath;
    });

  }

}
