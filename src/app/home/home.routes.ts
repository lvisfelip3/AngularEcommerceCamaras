import { Routes } from '@angular/router';

export default [
    {
        path: '', 
        loadComponent: () => import('./home.component').then(m => m.HomeComponent)
    },
] as Routes;