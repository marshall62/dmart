import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';
import {environment} from '../../../environments/environment';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { images } from '../../data/image.data';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit, OnChanges {
  @Input() artworks: Artwork[] = [];
  @Output() carouselImageClicked = new EventEmitter();
  @Input() selectedIndex: number = 0;
  numThumbs = this.artworks.length;
  beginIndex = 0;
  endIndex = this.numThumbs;
  thumbURLs = [];
  viewableThumbs = this.artworks.slice(0,this.endIndex);
  small = false;
  angleLeft = faAngleLeft;
  angleRight = faAngleRight;

  constructor() {
  }

  ngOnInit(): void {
    this.beginIndex = 0;
    this.selectedIndex = 0;
    this.endIndex = this.artworks.length;
    this.numThumbs = this.artworks.length;
    this.viewableThumbs = this.artworks.slice(this.beginIndex,this.endIndex);
    this.adjustIndices();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("in ngOnChanges",changes);
    this.artworks = changes.artworks.currentValue;
    this.ngOnInit();
  }


  adjustIndices () {
    let imgRowDiv = document.getElementsByClassName('image-row')[0];
    let rowWidth = imgRowDiv.clientWidth;
    this.small = false;
    let colWidth = rowWidth * 0.08;  // TODO this is 8% in css and needs to be obtained from it
    if (rowWidth < 425) {
      colWidth = rowWidth * .18;
      this.small = true;
    }
    let imageSlots = Math.floor(rowWidth / colWidth);

    this.numThumbs = Math.min(this.artworks.length, imageSlots);
    this.endIndex = this.beginIndex + this.numThumbs;
    this.viewableThumbs = this.artworks.slice(this.beginIndex,this.endIndex);
  }

  onResize (event){
    this.adjustIndices()
  }

  enterThumb(event) {
    let imgCol = event.target.parentElement;
    imgCol.classList.remove('image-column')
    imgCol.classList.add('image-column-enlarged')
  }

  exitThumb(event) {
    let imgCol = event.target.parentElement;
    imgCol.classList.remove('image-column-enlarged')
    imgCol.classList.add('image-column')
  }

  scrollView (amount: number) {

    let offset = +(amount*(this.numThumbs/2 - 1)).toFixed();
    this.beginIndex += offset;
    this.endIndex += offset;
    this.selectedIndex -= offset;
    this.viewableThumbs = this.artworks.slice(this.beginIndex, this.endIndex);
  }

  imageClicked (index:number) {
    this.selectedIndex = index;
    const realIndex = this.beginIndex + index;
    let event = {
      index: realIndex,
      image: this.artworks[realIndex]
      }
    this.carouselImageClicked.emit(event)
  }

  imageURL (artwork: Artwork): string {
    // no longer need ImageService for thumbnails.  Backend generates them.
    if (environment.generateThumbs)
      return environment.apiUrl + "/images/thumbnail?filename=" + encodeURIComponent(artwork.imagePath)
    else
      return globalConfig.imageRootURI + "/thumb/" + artwork.imagePath
  }

}
