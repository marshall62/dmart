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

// runs once when the app bootstraps.  Sets up the config.
function initializeApp(initSvc: AppInitService): () => Observable<Config> {
  return initSvc.Init();
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
