import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Home } from './pages/home/home';
import { Registration } from './pages/registration/registration';
import { City } from './pages/city/city';
import { Landmark } from './pages/landmark/landmark';
import { Attractions } from './pages/attractions/attractions';
import { AttractionList } from './pages/attractions/attraction-list';
import { AttractionDetail } from './pages/attractions/attraction-detail';
import { Photos } from './pages/photos/photos';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Registration },
  { path: 'city', component: City },
  { path: 'landmark', component: Landmark },
  {
    path: 'attractions',
    component: Attractions,
    children: [
      { path: '', component: AttractionList },
      { path: ':id', component: AttractionDetail },
    ],
  },
  { path: 'photos', component: Photos, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' },
];
