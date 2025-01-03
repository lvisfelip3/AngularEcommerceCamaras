import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./order.component').then(m => m.OrderComponent)
    },
    {
        path: 'confirmed/:orderRef',
        loadComponent: () => import('./confirmed/confirmed.component').then(m => m.ConfirmedComponent)
    }
] as Routes;