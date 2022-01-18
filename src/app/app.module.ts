import { NgModule } from '@angular/core';
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
    FormsModule
  ],
  providers: [
    ArtworkService,
    ImageService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
