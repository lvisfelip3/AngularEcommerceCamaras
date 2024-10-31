import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./order.component').then(m => m.OrderComponent)
    }
] as Routes;