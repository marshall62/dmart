import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArtworkService } from './services/artwork.service';
import { ImageSlideShowComponent } from './components/image-slide-show/image-slide-show.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ImageFocusComponent } from './components/image-focus/image-focus.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { ConfigService } from './services/config.service';
import { ImageService } from './services/image.service';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';
import { Config } from './models/config';
import { AppInitService } from './app-init.service';
import * as Realm from "realm-web";
import { MongoAtlasService } from './mongo-atlas.service';
// import { initializeFirebase } from './firebase-init';

export let realmApp; // The API to Mongo Atlas
// runs once when the app bootstraps.  Sets up the config.
function initializeApp(initSvc: AppInitService): () => Observable<Config> {
  // let {api, db} = initializeFirebase();
  // console.log("Firebase initialized", db);
  const id = "dm-art-api-jznsb";
  const config = {id,};
  realmApp = new Realm.App(config);
  console.log(`The realm app is `, realmApp);
  return initSvc.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ImageCarouselComponent,
    ImageModalComponent,
    ImageFocusComponent,
    NavbarComponent,
    ImageSlideShowComponent,
    ImageGridComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    ArtworkService,
    ImageService,
    ConfigService,
    MongoAtlasService,
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
