import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { globalConfig, updateConfig } from '../app/config'
import { Config } from './models/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  artist;
  imageRootURI;
  bgColor;

  constructor (private configSvc: ConfigService) {}

  ngOnInit(): void {
  }


}
