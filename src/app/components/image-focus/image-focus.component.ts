import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-focus',
  templateUrl: './image-focus.component.html',
  styleUrls: ['./image-focus.component.css']
})
export class ImageFocusComponent implements OnInit {

  @Input() artwork: Artwork;
  @Input() index: number;
  @Output() focusImageClicked = new EventEmitter();
  _imageURL: string;


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  // ngOnChanges (changes: SimpleChanges) {
  //   console.log("focus",changes);

  //   this.image = changes.image.currentValue;
  // }

  handleClick () {
    // this.focusImageClicked.emit(true);
    console.log("Initiating route to modal", this.artwork);
    this.router.navigateByUrl("works/fullsize/"+this.artwork?.imagePath,
      {state: {artwork: this.artwork, lastUrl: this.router.url, index: this.index}});
    // To route from this component to a child (modal) this component needs its own route but it doesn't have one.
    // Its in the carousel.  So this might need to create an event that the carousel listens for so that it
    // route to the modal.   The below doesn't work since I have no route.
    // this.router.navigate([this.artwork?.imagePath], {relativeTo: this.route});
  }

  imageURL () {
    return globalConfig.imageRootURI + "/midsize/" + this.artwork?.imagePath;
  }

}
