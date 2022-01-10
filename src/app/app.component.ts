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

  constructor (private configSvc: ConfigService) {}

  ngOnInit(): void {
    this.configSvc.getConfig().subscribe(c => {
      console.log("Database config",c);

      updateConfig(c);
      this.artist = globalConfig.artist;

    })
  }


}
