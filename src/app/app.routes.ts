import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'home', component: HomeComponent},
    {path: 'info/:contry_name', component: InfoComponent},
    {path: 'info', component: InfoComponent},
    {path: '**', component: ErrorComponent, redirectTo:''}
];
