import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
