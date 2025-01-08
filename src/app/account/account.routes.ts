import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./account.component').then(m => m.AccountComponent),
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)},
            { path: 'profile/info-personal', loadComponent: () => import('./profile/personal-data/personal-data.component').then(m => m.PersonalDataComponent) },
            { path: 'profile/direcciones', loadComponent: () => import('./profile/directions/directions.component').then(m => m.DirectionsComponent) },
            { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
            { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
        ]
    },
] as Routes;