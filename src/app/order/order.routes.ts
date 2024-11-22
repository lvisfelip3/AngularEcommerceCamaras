import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./order.component').then(m => m.OrderComponent)
    },
    {
        path: 'confirmed/:orderId',
        loadComponent: () => import('./confirmed/confirmed.component').then(m => m.ConfirmedComponent)
    }
] as Routes;