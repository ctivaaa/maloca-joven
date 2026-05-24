import { Routes } from '@angular/router';
import { LandingPage } from './components/not-shared/landing-page/landing-page';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage,
        title: 'Maloca Joven'
    }
];