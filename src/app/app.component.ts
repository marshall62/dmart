import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { globalConfig, updateConfig } from '../app/config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  artist;
  imageRootURI;

  constructor (private configSvc: ConfigService) {}

  ngOnInit(): void {
    this.configSvc.getConfig().subscribe(c => {
      this.imageRootURI = c.imageRootURI;
      this.artist = c.artist;
      this.configSvc.addConfig(c); // other components need this config so add it back to the service.
      updateConfig(c);
    })
  }


}
