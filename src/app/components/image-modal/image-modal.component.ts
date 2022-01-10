import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { globalConfig } from 'src/app/config';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() image;
  @Output() modalClosed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close () {
    this.modalClosed.emit(true);
  }

  imageURL () {
    return globalConfig.imageRootURI + "/" + this.image.url;
  }

}
