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


  handleClick () {
    // this.focusImageClicked.emit(true);
    this.router.navigateByUrl("works/fullsize/"+this.artwork?.imagePath,
      {state: {artwork: this.artwork, lastUrl: this.router.url, index: this.index}});
  }

  imageURL () {
    return globalConfig.imageRootURI + "/midsize/" + this.artwork?.imagePath;
  }

}
