import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../../models/artwork';
import { ArtworkService } from '../../services/artwork.service';

const NUM_THUMBS = 10;


@Component({
  selector: 'app-image-slide-show',
  templateUrl: './image-slide-show.component.html',
  styleUrls: ['./image-slide-show.component.css']
})
export class ImageSlideShowComponent implements OnInit {
  artworks: Artwork[] = [];
  index = 0;
  routeState;
  imageModalOpen = false;

  constructor(private route: ActivatedRoute,
    private artworkService: ArtworkService, private router: Router
    ) {
      this.route.paramMap.subscribe(params => {
        this.ngOnInit();
    });

    console.log("In constructor");

  }

  ngOnInit(): void {
    this.index = 0

    let group = this.route.snapshot.params['group']
    let searchTerm = this.route.snapshot.params['term']
    if (group) {
      console.log("OnInit group:",group);
      this.loadArtworks(group);
    }
    else {
      console.log("OnInit term:", searchTerm);
      this.artworks = this.artworkService.searchResults;
    }


  }

  loadArtworks(group): void {
    this.artworkService.fetchArtworks(group)
      .subscribe((results) => this.artworks = results);
  }

  updateLarge (event) {
    console.log("updateLarge ", event.index);
    this.index = event.index;
  }

}


