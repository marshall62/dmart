import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalConfig } from 'src/app/config';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  artwork: Artwork;
  lastUrl: string;
  @Output() modalClosed = new EventEmitter();
  image: string;
  index: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    const emptyArtwork = {title:"", media:"",year:"",price:"",width:"",height:""}
    this.artwork = (this.router.getCurrentNavigation()?.extras?.state?.artwork || emptyArtwork) as Artwork;
    this.lastUrl = this.router.getCurrentNavigation()?.extras?.state?.lastUrl || "";
    this.image = this.route.snapshot.params['image'];
    this.index = this.router.getCurrentNavigation()?.extras?.state?.index || 0;
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
      });
  }


  ngOnInit(): void {

  }

  close () {
    this.router.navigateByUrl(this.lastUrl, {state: {index: this.index}});
 }

  imageURL () {
    return globalConfig.imageRootURI + "/" + this.image;
  }

}
