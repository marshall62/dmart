import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() artwork: Artwork;
  @Output() modalClosed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close () {
    this.modalClosed.emit(true);
  }

  imageURL () {
    return globalConfig.imageRootURI + "/" + this.artwork.url;
  }

}
