import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';

export default [
    {
        path: '',
        component: AccountComponent,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
            { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
            { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
        ]
    },
] as Routes;