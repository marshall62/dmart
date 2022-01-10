import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { globalConfig } from 'src/app/config';

@Component({
  selector: 'app-image-focus',
  templateUrl: './image-focus.component.html',
  styleUrls: ['./image-focus.component.css']
})
export class ImageFocusComponent implements OnInit {

  @Input() image;
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
    return globalConfig.imageRootURI + "/" + this.image?.url;
  }

}
