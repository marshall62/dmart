import { Component, OnInit, Input } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm: string = "";
  @Input() artist:any;

  constructor(private artworkSvc:ArtworkService, private router: Router) { }

  ngOnInit(): void {
  }

  searchWorks(searchTerm:string) {
    this.artworkSvc.searchArtworks(searchTerm).subscribe(
      works => {
        if (works.length > 0) {
          this.artworkSvc.searchResults = works; // save results back to service for reuse
          this.router.navigate(["works/search/"+searchTerm]);
        }
      })
  }

}
