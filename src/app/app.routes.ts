import { Routes } from '@angular/router';
import {HomePageComponent} from './features/home/pages/home-page/home-page.component';
import {EventsMapComponent} from './features/home/components/events-map/events-map.component';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component:HomePageComponent
  },
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'events-map',
    component:EventsMapComponent
  }

];
