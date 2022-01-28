import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-image-focus',
  templateUrl: './image-focus.component.html',
  styleUrls: ['./image-focus.component.css']
})
export class ImageFocusComponent implements OnInit {

  @Input() artwork: Artwork;
  @Output() focusImageClicked = new EventEmitter();
  _imageURL: string;


  constructor() { }

  ngOnInit(): void {

  }

  // ngOnChanges (changes: SimpleChanges) {
  //   console.log("focus",changes);

  //   this.image = changes.image.currentValue;
  // }

  handleClick () {
    this.focusImageClicked.emit(true);
  }

  imageURL () {
    return globalConfig.imageRootURI + "/midsize/" + this.artwork?.imagePath;
  }

}
