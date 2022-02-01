import { Routes } from "@angular/router";
import { ImageGridComponent } from "./components/image-grid/image-grid.component";
import { ImageSlideShowComponent } from "./components/image-slide-show/image-slide-show.component";
import {HomeComponent} from "./components/home/home.component";
// import { Error404Component } from "./errors/errors.component";


export const appRoutes:Routes = [
  // {path: '', redirectTo: '/works/recent', pathMatch:'full' },
  {path: '', component: HomeComponent },
  {path: 'recentWork', redirectTo: '/works/recent', pathMatch:'full' },
  {path: 'allWork', redirectTo: '/works/all', pathMatch:'full' },
  {path: 'works/categories', component: ImageGridComponent },
  {path: 'works/:group', component: ImageSlideShowComponent },
  {path: 'works/search/:term', component: ImageSlideShowComponent },

]
