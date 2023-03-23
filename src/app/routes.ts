import { Routes } from "@angular/router";
import { ImageGridComponent } from "./components/image-grid/image-grid.component";
import { ImageModalComponent } from "./components/image-modal/image-modal.component";
import { ImageSlideShowComponent } from "./components/image-slide-show/image-slide-show.component";
import {HomeComponent} from "./components/home/home.component";
// import { Error404Component } from "./errors/errors.component";


export const appRoutes:Routes = [
  {path: '', component: HomeComponent },
  {path: 'recentWork', redirectTo: '/works/recent', pathMatch:'full' },
  {path: 'allWork', redirectTo: '/works/all', pathMatch:'full' },
  {path: 'works/categories', component: ImageGridComponent },
  {path: 'works/fullsize/:image', component: ImageModalComponent },
  {path: 'works/search/:term', component: ImageSlideShowComponent},
  {path: 'works/:group', component: ImageSlideShowComponent },


]
